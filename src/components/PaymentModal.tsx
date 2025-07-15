import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { X, CreditCard, Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import stripePromise from '../lib/stripe';
import StripePaymentForm from './StripePaymentForm';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentType: 'tax' | 'utility' | 'property';
  amount: number;
  description: string;
  propertyId?: string;
  onSuccess?: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  paymentType,
  amount,
  description,
  propertyId,
  onSuccess
}) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer'>('card');

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      onSuccess?.();
      onClose();
      setPaymentSuccess(false);
      setError(null);
    }, 2000);
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleClose = () => {
    onClose();
    setPaymentSuccess(false);
    setError(null);
  };

  const getPaymentTypeIcon = () => {
    switch (paymentType) {
      case 'tax':
        return <Shield className="h-6 w-6 text-green-600" />;
      case 'utility':
        return <Clock className="h-6 w-6 text-blue-600" />;
      case 'property':
        return <CreditCard className="h-6 w-6 text-purple-600" />;
      default:
        return <CreditCard className="h-6 w-6 text-gray-600" />;
    }
  };

  const getPaymentTypeColor = () => {
    switch (paymentType) {
      case 'tax':
        return 'from-green-600 to-emerald-600';
      case 'utility':
        return 'from-blue-600 to-cyan-600';
      case 'property':
        return 'from-purple-600 to-pink-600';
      default:
        return 'from-gray-600 to-slate-600';
    }
  };

  if (!isOpen) return null;

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-4">Your payment of ₦{amount.toLocaleString()} has been processed successfully.</p>
          <div className="text-sm text-gray-500">
            Transaction will be recorded on the blockchain for transparency.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getPaymentTypeIcon()}
              <div>
                <h3 className="text-lg font-bold text-gray-900">Secure Payment</h3>
                <p className="text-sm text-gray-600 capitalize">{paymentType} Payment</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-800 text-sm font-medium">Payment Failed</p>
                <p className="text-red-700 text-xs mt-1">{error}</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'bank_transfer')}
                  className="text-green-600 focus:ring-green-500"
                />
                <CreditCard className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Credit/Debit Card</p>
                  <p className="text-sm text-gray-600">Visa, Mastercard, Verve</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200 opacity-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  disabled
                  className="text-green-600 focus:ring-green-500"
                />
                <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Bank Transfer</p>
                  <p className="text-sm text-gray-600">Coming soon</p>
                </div>
              </label>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                amount={amount}
                description={description}
                paymentType={paymentType}
                propertyId={propertyId}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;