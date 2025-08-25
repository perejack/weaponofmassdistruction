// Import the payment statuses from callback function
const { paymentStatuses } = require('./payment-callback');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow GET requests
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
    
    // Check in-memory storage for payment status
    const paymentData = paymentStatuses.get(reference);
    
    if (paymentData) {
      console.log(`Payment status found for ${reference}:`, paymentData);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          payment: {
            status: paymentData.status,
            amount: paymentData.amount,
            phoneNumber: paymentData.phoneNumber,
            mpesaReceiptNumber: paymentData.mpesaReceiptNumber,
            resultDesc: paymentData.resultDesc,
            resultCode: paymentData.resultCode,
            timestamp: paymentData.timestamp
          }
        })
      };
    } else {
      // Payment not found yet (still pending)
      console.log(`Payment status not found for ${reference}, still pending`);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          payment: {
            status: 'PENDING',
            message: 'Payment is still being processed'
          }
        })
      };
    }
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
