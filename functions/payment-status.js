// Netlify function to check payment status
const axios = require('axios');

// PayHero API credentials
const API_USERNAME = 'n25snHm7WIVFgr5iGc28';
const API_PASSWORD = 'bsMCzq8DCgUi7sKt1nwwacw14UC6jofqwGGUzov6';

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
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  // Process GET request
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }
  
  try {
    // Get reference from path parameter
    const reference = event.path.split('/').pop();
    
    if (!reference) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Payment reference is required' })
      };
    }
    
    const response = await axios({
      method: 'get',
      url: `https://backend.payhero.co.ke/api/v2/payments/status/${reference}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': generateBasicAuthToken()
      }
    });
    
    // Log the actual response for debugging
    console.log('PayHero API Response:', JSON.stringify(response.data, null, 2));
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        payment: {
          status: response.data.status || response.data.Status || 'PENDING',
          amount: response.data.amount || response.data.Amount,
          phoneNumber: response.data.phone_number || response.data.PhoneNumber,
          mpesaReceiptNumber: response.data.mpesa_receipt_number || response.data.MpesaReceiptNumber,
          resultDesc: response.data.result_desc || response.data.ResultDesc,
          rawData: response.data // Include raw data for debugging
        }
      })
    };
  } catch (error) {
    console.error('Payment status check error:', error.response?.data || error.message);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to check payment status',
        error: error.response?.data || error.message
      })
    };
  }
};
