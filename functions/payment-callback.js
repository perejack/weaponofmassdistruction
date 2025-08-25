// In-memory storage for payment status (use database in production)
const paymentStatuses = new Map();

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
    // Parse the callback data
    const callbackData = JSON.parse(event.body);
    
    // Log the callback for debugging
    console.log('Payment callback received:', JSON.stringify(callbackData, null, 2));
    
    // Extract payment info from PayHero callback
    const response = callbackData.response || {};
    const checkoutRequestId = response.CheckoutRequestID;
    const externalReference = response.ExternalReference;
    
    if (checkoutRequestId) {
      // Store payment status in memory
      const paymentData = {
        status: response.Status === 'Success' ? 'SUCCESS' : 'FAILED',
        amount: response.Amount,
        phoneNumber: response.Phone,
        mpesaReceiptNumber: response.MpesaReceiptNumber,
        resultDesc: response.ResultDesc,
        resultCode: response.ResultCode,
        timestamp: new Date().toISOString()
      };
      
      // Store by both CheckoutRequestID and ExternalReference
      paymentStatuses.set(checkoutRequestId, paymentData);
      if (externalReference) {
        paymentStatuses.set(externalReference, paymentData);
      }
      
      console.log(`Payment status stored for ${checkoutRequestId}:`, paymentData);
    }
    
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

// Export the payment statuses for other functions to access
exports.getPaymentStatus = (reference) => {
  return paymentStatuses.get(reference);
};

exports.paymentStatuses = paymentStatuses;
