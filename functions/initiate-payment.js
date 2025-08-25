// Netlify function to initiate payment
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

// PayHero API credentials
const API_USERNAME = 'n25snHm7WIVFgr5iGc28';
const API_PASSWORD = 'bsMCzq8DCgUi7sKt1nwwacw14UC6jofqwGGUzov6';
const CHANNEL_ID = 2936;

// Supabase configuration
const supabaseUrl = 'https://xrffhhvneuwhqxhrjbct.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZmZoaHZuZXV3aHF4aHJqYmN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjEyMTIwOSwiZXhwIjoyMDcxNjk3MjA5fQ.k1IlRXRKsK3ErmXBlb81356M6BvEKqP9e3c8KARW2_Y';
const supabase = createClient(supabaseUrl, supabaseKey);

// Generate Basic Auth Token
const generateBasicAuthToken = () => {
  const credentials = `${API_USERNAME}:${API_PASSWORD}`;
  return 'Basic ' + Buffer.from(credentials).toString('base64');
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  // Process POST request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }
  
  try {
    const requestBody = JSON.parse(event.body);
    const { phoneNumber, userId, amount = 200, description = 'SurvayPay Account Activation' } = requestBody;
    
    if (!phoneNumber) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Phone number is required' })
      };
    }
    
    // Generate a unique reference for this payment
    const externalReference = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Define the callback URL - use Netlify function URL
    const callbackUrl = `${process.env.URL || 'https://iboosting.netlify.app'}/.netlify/functions/payment-callback`;
    
    const requestData = {
      phoneNumber,
      amount,
      userId,
      description
    };
    
    const response = await axios({
      method: 'post',
      url: 'https://backend.payhero.co.ke/api/v2/payments',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': generateBasicAuthToken()
      },
      data: {
        amount: requestData.amount,
        phone_number: requestData.phoneNumber,
        channel_id: CHANNEL_ID,
        provider: 'm-pesa',
        external_reference: externalReference,
        callback_url: `${process.env.URL || 'https://iboosting.netlify.app'}/.netlify/functions/payment-callback`
      }
    });
    
    const checkoutRequestId = response.data.CheckoutRequestID;
    
    // Store initial payment record in Supabase
    if (checkoutRequestId) {
      const { error: dbError } = await supabase
        .from('payments')
        .insert({
          checkout_request_id: checkoutRequestId,
          external_reference: externalReference,
          status: 'PENDING',
          amount: requestData.amount,
          phone_number: requestData.phoneNumber
        });
      
      if (dbError) {
        console.error('Error storing initial payment record:', dbError);
      } else {
        console.log('Initial payment record stored:', checkoutRequestId);
      }
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Payment initiated successfully',
        data: {
          externalReference: checkoutRequestId || externalReference,
          checkoutRequestId: checkoutRequestId
        }
      })
    };
  } catch (error) {
    console.error('Payment initiation error:', error.response?.data || error.message);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to initiate payment',
        error: error.response?.data || error.message
      })
    };
  }
};
