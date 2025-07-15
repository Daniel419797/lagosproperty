import React, { useState } from 'react';
import { Home, Building2, CreditCard, Zap, User, BarChart3, Settings, Bell, MapPin, Shield, CheckCircle, AlertTriangle, TrendingUp, Users, FileText, Wallet } from 'lucide-react';
import PaymentModal from './components/PaymentModal';
import PaymentHistory from './components/PaymentHistory';
import LandingPage from './components/LandingPage';

type UserType = 'citizen' | 'property-owner' | 'government';
type ViewType = 'landing' | 'dashboard' | 'marketplace' | 'tax-payment' | 'utilities' | 'properties' | 'compliance' | 'analytics';

interface Property {
  id: string;
  title: string;
  type: 'rent' | 'sale';
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  eNumberVerified: boolean;
  taxCompliant: boolean;
  utilitiesConnected: boolean;
  image: string;
}

interface TaxRecord {
  id: string;
  property: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
  numericAmount: number;
}

interface UtilityService {
  id: string;
  type: 'water' | 'electricity' | 'waste';
  status: 'active' | 'inactive' | 'suspended';
  lastBill: string;
  dueDate: string;
  numericAmount: number;
}

function App() {
  const [userType, setUserType] = useState<UserType>('citizen');
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    type: 'tax' | 'utility' | 'property';
    amount: number;
    description: string;
    propertyId?: string;
  }>({
    isOpen: false,
    type: 'tax',
    amount: 0,
    description: '',
  });

  const sampleProperties: Property[] = [
    {
      id: '1',
      title: 'Modern 3BR Apartment in Victoria Island',
      type: 'rent',
      price: '₦2,500,000/year',
      location: 'Victoria Island, Lagos',
      bedrooms: 3,
      bathrooms: 2,
      area: '120 sqm',
      eNumberVerified: true,
      taxCompliant: true,
      utilitiesConnected: true,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Luxury 4BR House in Lekki Phase 1',
      type: 'sale',
      price: '₦85,000,000',
      location: 'Lekki Phase 1, Lagos',
      bedrooms: 4,
      bathrooms: 3,
      area: '200 sqm',
      eNumberVerified: true,
      taxCompliant: false,
      utilitiesConnected: false,
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: '2BR Flat in Surulere',
      type: 'rent',
      price: '₦1,200,000/year',
      location: 'Surulere, Lagos',
      bedrooms: 2,
      bathrooms: 1,
      area: '85 sqm',
      eNumberVerified: true,
      taxCompliant: true,
      utilitiesConnected: true,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const sampleTaxRecords: TaxRecord[] = [
    {
      id: '1',
      property: 'Victoria Island Apartment',
      amount: '₦450,000',
      numericAmount: 450000,
      status: 'paid',
      dueDate: '2024-03-31',
      paidDate: '2024-03-15'
    },
    {
      id: '2',
      property: 'Lekki House',
      amount: '₦1,200,000',
      numericAmount: 1200000,
      status: 'pending',
      dueDate: '2024-12-31'
    }
  ];

  const sampleUtilities: UtilityService[] = [
    {
      id: '1',
      type: 'electricity',
      status: 'active',
      lastBill: '₦25,000',
      numericAmount: 25000,
      dueDate: '2024-01-15'
    },
    {
      id: '2',
      type: 'water',
      status: 'active',
      lastBill: '₦8,500',
      numericAmount: 8500,
      dueDate: '2024-01-20'
    },
    {
      id: '3',
      type: 'waste',
      status: 'suspended',
      lastBill: '₦3,000',
      numericAmount: 3000,
      dueDate: '2024-01-10'
    }
  ];

  const openPaymentModal = (type: 'tax' | 'utility' | 'property', amount: number, description: string, propertyId?: string) => {
    setPaymentModal({
      isOpen: true,
      type,
      amount,
      description,
      propertyId
    });
  };

  const closePaymentModal = () => {
    setPaymentModal({
      isOpen: false,
      type: 'tax',
      amount: 0,
      description: '',
    });
  };

  const handleGetStarted = () => {
    setCurrentView('dashboard');
    setIsAuthenticated(true);
  };

  const handleSignIn = (selectedUserType: UserType) => {
    setUserType(selectedUserType);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Lagos PropertyChain</h1>
            <p className="text-gray-600 mt-2">Blockchain-Powered Property Management</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
              <select 
                value={userType} 
                onChange={(e) => setUserType(e.target.value as UserType)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="citizen">Citizen</option>
                <option value="property-owner">Property Owner</option>
                <option value="government">Government Agency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button 
              onClick={() => handleSignIn(userType)}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Sign In
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Don't have an account? <a href="#" className="text-green-600 hover:text-green-700 font-medium">Register here</a>
            </p>
            <button 
              onClick={() => setCurrentView('landing')}
              className="w-full mt-3 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'marketplace', label: 'Marketplace', icon: Building2 },
      { id: 'tax-payment', label: 'Tax Payment', icon: CreditCard },
      { id: 'utilities', label: 'Utilities', icon: Zap },
      ...(userType === 'property-owner' ? [{ id: 'properties', label: 'My Properties', icon: MapPin }] : []),
      ...(userType === 'government' ? [
        { id: 'compliance', label: 'Compliance', icon: Shield },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
      ] : [])
    ];

    return (
      <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">PropertyChain</h1>
              <p className="text-xs text-gray-600 capitalize">{userType.replace('-', ' ')}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as ViewType)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => {
              setIsAuthenticated(false);
              setCurrentView('landing');
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-200"
          >
            <User className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    );
  };

  const StatsCard = ({ title, value, subtitle, icon: Icon, trend }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 bg-green-50 rounded-xl">
          <Icon className="h-6 w-6 text-green-600" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-4 text-sm">
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-green-600 font-medium">{trend}</span>
          <span className="text-gray-500 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );

  const PropertyCard = ({ property }: { property: Property }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            property.type === 'rent' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
          }`}>
            For {property.type === 'rent' ? 'Rent' : 'Sale'}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex space-x-1">
          {property.eNumberVerified && <CheckCircle className="h-5 w-5 text-green-500" />}
          {property.taxCompliant && <Shield className="h-5 w-5 text-blue-500" />}
          {!property.taxCompliant && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-gray-900 text-lg mb-2">{property.title}</h3>
        <p className="text-gray-600 text-sm mb-3 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4 text-sm text-gray-600">
            <span>{property.bedrooms} bed</span>
            <span>{property.bathrooms} bath</span>
            <span>{property.area}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-green-600">{property.price}</p>
          <button 
            onClick={() => openPaymentModal('property', 2500000, `Property Purchase - ${property.title}`, property.id)}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-colors duration-200"
          >
            {property.type === 'rent' ? 'Pay Rent' : 'Purchase'}
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className={`flex items-center ${property.eNumberVerified ? 'text-green-600' : 'text-gray-400'}`}>
              <CheckCircle className="h-3 w-3 mr-1" />
              E-Number Verified
            </span>
            <span className={`flex items-center ${property.taxCompliant ? 'text-green-600' : 'text-yellow-600'}`}>
              <Shield className="h-3 w-3 mr-1" />
              Tax {property.taxCompliant ? 'Compliant' : 'Pending'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back to Lagos PropertyChain</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Notifications</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userType === 'citizen' && (
          <>
            <StatsCard title="Properties Viewed" value="12" icon={Building2} trend="+5%" />
            <StatsCard title="Tax Payments" value="2" subtitle="This year" icon={CreditCard} />
            <StatsCard title="Active Utilities" value="3" icon={Zap} />
            <StatsCard title="Compliance Score" value="98%" icon={Shield} trend="+2%" />
          </>
        )}
        
        {userType === 'property-owner' && (
          <>
            <StatsCard title="Listed Properties" value="5" icon={Building2} trend="+1" />
            <StatsCard title="Total Revenue" value="₦15.2M" subtitle="This year" icon={Wallet} trend="+12%" />
            <StatsCard title="Tax Paid" value="₦2.1M" icon={CreditCard} />
            <StatsCard title="Occupancy Rate" value="85%" icon={Users} trend="+5%" />
          </>
        )}
        
        {userType === 'government' && (
          <>
            <StatsCard title="Total Properties" value="45,672" icon={Building2} trend="+1.2%" />
            <StatsCard title="Tax Collection" value="₦12.8B" subtitle="This month" icon={CreditCard} trend="+8%" />
            <StatsCard title="Compliance Rate" value="78%" icon={Shield} trend="+3%" />
            <StatsCard title="Active Services" value="89%" icon={Zap} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentHistory />

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => openPaymentModal('tax', 450000, 'Property Tax Payment - Victoria Island')}
              className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-200 text-left"
            >
              <CreditCard className="h-8 w-8 text-green-600 mb-2" />
              <p className="font-medium text-gray-900">Pay Tax</p>
              <p className="text-sm text-gray-600">Make payment</p>
            </button>
            <button 
              onClick={() => setCurrentView('marketplace')}
              className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200 text-left"
            >
              <Building2 className="h-8 w-8 text-blue-600 mb-2" />
              <p className="font-medium text-gray-900">Browse Properties</p>
              <p className="text-sm text-gray-600">Find your home</p>
            </button>
            <button 
              onClick={() => openPaymentModal('utility', 25000, 'Electricity Bill Payment')}
              className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-200 text-left"
            >
              <Zap className="h-8 w-8 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900">Pay Utilities</p>
              <p className="text-sm text-gray-600">Pay bills</p>
            </button>
            <button className="p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors duration-200 text-left">
              <FileText className="h-8 w-8 text-yellow-600 mb-2" />
              <p className="font-medium text-gray-900">Reports</p>
              <p className="text-sm text-gray-600">View documents</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Marketplace = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Property Marketplace</h1>
          <p className="text-gray-600 mt-1">Verified properties with blockchain e-numbers</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200">
          List Property
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option>All Types</option>
            <option>For Rent</option>
            <option>For Sale</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option>All Locations</option>
            <option>Victoria Island</option>
            <option>Lekki</option>
            <option>Surulere</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option>Price Range</option>
            <option>Under ₦1M</option>
            <option>₦1M - ₦5M</option>
            <option>Above ₦5M</option>
          </select>
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200">
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );

  const TaxPayment = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tax Payment</h1>
          <p className="text-gray-600 mt-1">Smart contract-based tax collection</p>
        </div>
        <button 
          onClick={() => openPaymentModal('tax', 450000, 'Property Tax Payment')}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200"
        >
          Make Payment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tax Records</h3>
            <div className="space-y-4">
              {sampleTaxRecords.map(record => (
                <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{record.property}</p>
                    <p className="text-sm text-gray-600">Due: {record.dueDate}</p>
                  </div>
                  <div className="text-right flex items-center space-x-3">
                    <div>
                      <p className="font-bold text-gray-900">{record.amount}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        record.status === 'paid' ? 'bg-green-100 text-green-800' :
                        record.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                    {record.status === 'pending' && (
                      <button
                        onClick={() => openPaymentModal('tax', record.numericAmount, `Tax Payment - ${record.property}`)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tax Allocation</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Infrastructure</span>
                <span className="font-medium">40%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Education</span>
                <span className="font-medium">25%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Healthcare</span>
                <span className="font-medium">20%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Security</span>
                <span className="font-medium">15%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Blockchain Status</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-900">Smart Contract Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-900">Transactions Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-900">Funds Escrowed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Utilities = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Utility Services</h1>
          <p className="text-gray-600 mt-1">Connected services based on tax compliance</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200">
          Connect Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleUtilities.map(utility => (
          <div key={utility.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl ${
                  utility.type === 'electricity' ? 'bg-yellow-100' :
                  utility.type === 'water' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  <Zap className={`h-6 w-6 ${
                    utility.type === 'electricity' ? 'text-yellow-600' :
                    utility.type === 'water' ? 'text-blue-600' : 'text-green-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 capitalize">{utility.type}</h3>
                  <p className="text-sm text-gray-600">Service</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                utility.status === 'active' ? 'bg-green-100 text-green-800' :
                utility.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                'bg-red-100 text-red-800'
              }`}>
                {utility.status.charAt(0).toUpperCase() + utility.status.slice(1)}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Last Bill</span>
                <span className="font-medium">{utility.lastBill}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Due Date</span>
                <span className="font-medium">{utility.dueDate}</span>
              </div>
            </div>
            
            <button 
              onClick={() => openPaymentModal('utility', utility.numericAmount, `${utility.type.charAt(0).toUpperCase() + utility.type.slice(1)} Bill Payment`)}
              className={`w-full mt-4 py-2 rounded-xl font-medium transition-colors duration-200 ${
                utility.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              {utility.status === 'active' ? 'Pay Bill' : 'Pay & Reconnect'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Service Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">Tax Compliance</h4>
            <p className="text-sm text-gray-600 mt-1">Property taxes must be up to date</p>
          </div>
          <div className="text-center p-4">
            <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">E-Number Verification</h4>
            <p className="text-sm text-gray-600 mt-1">Blockchain-verified property ID required</p>
          </div>
          <div className="text-center p-4">
            <Building2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">Property Registration</h4>
            <p className="text-sm text-gray-600 mt-1">Valid property registration certificate</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'dashboard':
        return <Dashboard />;
      case 'marketplace':
        return <Marketplace />;
      case 'tax-payment':
        return <TaxPayment />;
      case 'utilities':
        return <Utilities />;
      default:
        return <Dashboard />;
    }
  };

  // Show landing page
  if (currentView === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Show login screen if not authenticated and not on landing
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // Show main application
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderCurrentView()}
        </div>
      </main>
      
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        paymentType={paymentModal.type}
        amount={paymentModal.amount}
        description={paymentModal.description}
        propertyId={paymentModal.propertyId}
        onSuccess={() => {
          // Handle successful payment
          console.log('Payment successful');
        }}
      />
    </div>
  );
}

export default App;