// Google Analytics conversion tracking utility

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Track a conversion event in Google Analytics
 * @param value - The monetary value of the conversion (optional)
 * @param currency - The currency code (default: 'KES' for Kenyan Shilling)
 * @param transactionId - Unique transaction identifier (optional)
 */
export function trackConversion(
  value?: number,
  currency: string = 'KES',
  transactionId?: string
) {
  // Check if gtag is available
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      // Track the conversion event
      window.gtag('event', 'conversion', {
        send_to: 'AW-17559077902', // Your Google Ads conversion ID
        value: value,
        currency: currency,
        transaction_id: transactionId,
      });

      // Also track as a purchase event for enhanced tracking
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: currency,
        items: [{
          item_id: 'social_boost',
          item_name: 'Social Media Boost',
          category: 'digital_service',
          quantity: 1,
          price: value
        }]
      });

      console.log('Conversion tracked:', { value, currency, transactionId });
    } catch (error) {
      console.error('Error tracking conversion:', error);
    }
  } else {
    console.warn('Google Analytics (gtag) not available for conversion tracking');
  }
}

/**
 * Track a specific conversion action with custom parameters
 * @param action - The conversion action name
 * @param parameters - Additional parameters for the conversion
 */
export function trackCustomConversion(action: string, parameters: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', action, {
        send_to: 'AW-17559077902',
        ...parameters
      });
      
      console.log('Custom conversion tracked:', action, parameters);
    } catch (error) {
      console.error('Error tracking custom conversion:', error);
    }
  }
}
