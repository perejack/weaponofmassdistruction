const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://xrffhhvneuwhqxhrjbct.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZmZoaHZuZXV3aHF4aHJqYmN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjEyMTIwOSwiZXhwIjoyMDcxNjk3MjA5fQ.k1IlRXRKsK3ErmXBlb81356M6BvEKqP9e3c8KARW2_Y';
const supabase = createClient(supabaseUrl, supabaseKey);

// Netlify function to handle payment callback from PayHero
exports.handler = async (event, context) => {
  // Process POST request only
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ status: 'error', message: 'Method not allowed' })
    };
  }
  
  try {
    // --- DETAILED LOGGING START ---
    console.log('[CALLBACK_RECEIVED] Raw event body:', event.body);

    const callbackData = JSON.parse(event.body);
    console.log('[CALLBACK_PARSED] Parsed callback data:', JSON.stringify(callbackData, null, 2));

    const response = callbackData.response || {};
    const checkoutRequestId = response.CheckoutRequestID;
    console.log(`[CALLBACK_DATA] CheckoutRequestID: ${checkoutRequestId}`);

    if (!checkoutRequestId) {
      console.error('[CALLBACK_ERROR] No CheckoutRequestID found in the callback data.');
      return {
        statusCode: 400,
        body: JSON.stringify({ status: 'error', message: 'Invalid callback data: Missing CheckoutRequestID' })
      };
    }

    const paymentStatus = response.Status === 'Success' ? 'SUCCESS' : 'FAILED';
    console.log(`[CALLBACK_STATUS] Determined payment status: ${paymentStatus}`);

    const paymentData = {
      checkout_request_id: checkoutRequestId,
      external_reference: response.ExternalReference,
      status: paymentStatus,
      amount: response.Amount,
      phone_number: response.Phone,
      mpesa_receipt_number: response.MpesaReceiptNumber,
      result_desc: response.ResultDesc,
      result_code: response.ResultCode
    };

    console.log('[SUPABASE_UPSERT] Attempting to upsert payment data:', JSON.stringify(paymentData, null, 2));

    const { data, error } = await supabase
      .from('payments')
      .upsert(paymentData, { onConflict: 'checkout_request_id' });

    if (error) {
      console.error('[SUPABASE_ERROR] Error storing payment status:', JSON.stringify(error, null, 2));
    } else {
      console.log('[SUPABASE_SUCCESS] Payment status stored successfully for CheckoutRequestID:', checkoutRequestId);
    }
    // --- DETAILED LOGGING END ---

    // Acknowledge receipt of callback
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success', message: 'Callback received successfully' })
    };
  } catch (error) {
    console.error('Callback processing error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: 'Failed to process callback' })
    };
  }
};

