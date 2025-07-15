// Backend API simulation for Stripe integration
// In production, these would be actual API calls to your backend

export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  paymentType: 'tax' | 'utility' | 'property';
  description: string;
  propertyId?: string;
  paymentMethod: 'card' | 'bank_transfer';
}

export interface PaymentIntentResponse {
  clientSecret?: string;
  error?: string;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  created: string;
  description: string;
  type: 'tax' | 'utility' | 'property';
  propertyId?: string;
}

// Simulated backend API call to create payment intent
export const createPaymentIntent = async (data: PaymentIntentRequest): Promise<PaymentIntentResponse> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, this would call your backend:
    // const response = await fetch('/api/create-payment-intent', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // return await response.json();
    
    // Simulate successful response with mock client secret
    return {
      clientSecret: `pi_test_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`
    };
  } catch (error) {
    return {
      error: 'Failed to create payment intent'
    };
  }
};

// Simulated payment confirmation
export const confirmPayment = async (paymentIntentId: string): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { success: true };
};

// Simulated payment history fetch
export const getPaymentHistory = async (userId: string): Promise<PaymentRecord[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock payment history data
  return [
    {
      id: 'pi_1',
      amount: 45000000, // Amount in kobo (₦450,000)
      currency: 'ngn',
      status: 'succeeded',
      created: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
      description: 'Property Tax Payment - Victoria Island Apartment',
      type: 'tax',
      propertyId: 'prop_vi_001'
    },
    {
      id: 'pi_2',
      amount: 2500000, // Amount in kobo (₦25,000)
      currency: 'ngn',
      status: 'succeeded',
      created: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
      description: 'Electricity Bill Payment - December 2024',
      type: 'utility'
    },
    {
      id: 'pi_3',
      amount: 250000000, // Amount in kobo (₦2,500,000)
      currency: 'ngn',
      status: 'succeeded',
      created: new Date(Date.now() - 86400000 * 14).toISOString(), // 14 days ago
      description: 'Annual Rent Payment - Modern 3BR Apartment',
      type: 'property',
      propertyId: 'prop_vi_002'
    },
    {
      id: 'pi_4',
      amount: 850000, // Amount in kobo (₦8,500)
      currency: 'ngn',
      status: 'succeeded',
      created: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
      description: 'Water Bill Payment - December 2024',
      type: 'utility'
    },
    {
      id: 'pi_5',
      amount: 120000000, // Amount in kobo (₦1,200,000)
      currency: 'ngn',
      status: 'pending',
      created: new Date().toISOString(), // Today
      description: 'Property Tax Payment - Lekki House',
      type: 'tax',
      propertyId: 'prop_lekki_001'
    }
  ];
};

// Utility function to format payment amounts
export const formatPaymentAmount = (amountInKobo: number): string => {
  const amountInNaira = amountInKobo / 100;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amountInNaira);
};

// Utility function to get payment type display name
export const getPaymentTypeDisplayName = (type: string): string => {
  switch (type) {
    case 'tax':
      return 'Tax Payment';
    case 'utility':
      return 'Utility Bill';
    case 'property':
      return 'Property Transaction';
    default:
      return 'Payment';
  }
};

// Utility function to get payment status color
export const getPaymentStatusColor = (status: string): string => {
  switch (status) {
    case 'succeeded':
      return 'text-green-600 bg-green-100';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'failed':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};