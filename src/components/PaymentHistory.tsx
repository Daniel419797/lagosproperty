import React, { useState, useEffect } from 'react';
import { CreditCard, Shield, Zap, Calendar, CheckCircle, Clock, AlertCircle, Building2 } from 'lucide-react';
import { getPaymentHistory, formatPaymentAmount, getPaymentTypeDisplayName, getPaymentStatusColor } from '../api/stripe';

interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  created: string;
  description: string;
  type: 'tax' | 'utility' | 'property';
  propertyId?: string;
}

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'tax' | 'utility' | 'property'>('all');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const history = await getPaymentHistory('user_123');
        setPayments(history);
      } catch (error) {
        console.error('Failed to fetch payment history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'tax':
        return <Shield className="h-5 w-5 text-green-600" />;
      case 'utility':
        return <Zap className="h-5 w-5 text-blue-600" />;
      case 'property':
        return <Building2 className="h-5 w-5 text-purple-600" />;
      default:
        return <CreditCard className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredPayments = filter === 'all' 
    ? payments 
    : payments.filter(payment => payment.type === filter);

  // Calculate summary statistics
  const totalAmount = payments
    .filter(p => p.status === 'succeeded')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const thisMonthPayments = payments.filter(payment => {
    const paymentDate = new Date(payment.created);
    const now = new Date();
    return paymentDate.getMonth() === now.getMonth() && 
           paymentDate.getFullYear() === now.getFullYear() &&
           payment.status === 'succeeded';
  });

  const thisMonthAmount = thisMonthPayments.reduce((sum, payment) => sum + payment.amount, 0);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Payment History</h3>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <span>Total: {formatPaymentAmount(totalAmount)}</span>
            <span>•</span>
            <span>This month: {formatPaymentAmount(thisMonthAmount)}</span>
          </div>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
        >
          <option value="all">All Payments</option>
          <option value="tax">Tax Payments</option>
          <option value="utility">Utility Bills</option>
          <option value="property">Property Transactions</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredPayments.length === 0 ? (
          <div className="text-center py-8">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No payment history found</p>
            <p className="text-sm text-gray-500 mt-1">
              {filter === 'all' 
                ? 'Your payments will appear here once you make them' 
                : `No ${filter} payments found`
              }
            </p>
          </div>
        ) : (
          filteredPayments.map(payment => (
            <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  {getPaymentIcon(payment.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{payment.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-3 w-3 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {new Date(payment.created).toLocaleDateString('en-NG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                      {getPaymentTypeDisplayName(payment.type)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-gray-900">{formatPaymentAmount(payment.amount)}</p>
                <div className="flex items-center justify-end space-x-1 mt-1">
                  {getStatusIcon(payment.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(payment.status)}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredPayments.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Showing {filteredPayments.length} of {payments.length} transactions</span>
            <button className="text-green-600 hover:text-green-700 font-medium transition-colors">
              View All Transactions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;