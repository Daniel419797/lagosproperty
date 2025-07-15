import React, { useState } from 'react';
import { 
  Building2, 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Play,
  Star,
  Users,
  TrendingUp,
  MapPin,
  CreditCard,
  Globe,
  Award,
  ChevronDown,
  Menu,
  X,
  Wallet,
  Link
} from 'lucide-react';
import WalletConnection from './WalletConnection';
import { WalletInfo } from '../lib/cardano';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<WalletInfo | null>(null);

  const features = [
    {
      icon: Building2,
      title: "Verified Digital Marketplace",
      description: "Browse and transact with blockchain-verified properties. Every listing comes with authenticated e-numbers and compliance history.",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: Shield,
      title: "Smart Tax Escrow System",
      description: "Transparent property tax collection with blockchain-powered smart contracts. Track exactly how your taxes are allocated and used.",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: Zap,
      title: "Integrated Utility Services",
      description: "Seamlessly connect water, electricity, and waste services to your property. Only tax-compliant properties maintain active services.",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Wallet,
      title: "Cardano Blockchain Integration",
      description: "Connect your Cardano wallet for secure, decentralized property transactions. All records are immutably stored on the blockchain.",
      color: "from-orange-600 to-red-600"
    }
  ];

  const stats = [
    { number: "45,672", label: "Verified Properties", icon: Building2 },
    { number: "₦12.8B", label: "Tax Revenue Collected", icon: CreditCard },
    { number: "98%", label: "Compliance Rate", icon: Shield },
    { number: "150K+", label: "Active Users", icon: Users }
  ];

  const testimonials = [
    {
      name: "Adebayo Ogundimu",
      role: "Property Owner, Victoria Island",
      content: "PropertyChain transformed how I manage my properties. The blockchain verification gives my tenants complete confidence, and tax payments are now transparent and automated.",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Funmi Adebisi",
      role: "First-time Home Buyer",
      content: "I found my dream apartment through PropertyChain. Knowing that every property is verified and tax-compliant gave me peace of mind during the purchase process.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Dr. Kemi Olatunji",
      role: "Lagos State Urban Planning",
      content: "PropertyChain has revolutionized our approach to urban governance. The transparency in tax collection and utility management has improved citizen trust significantly.",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  const handleWalletConnected = (walletInfo: WalletInfo) => {
    setConnectedWallet(walletInfo);
    setIsWalletModalOpen(false);
  };

  const Header = () => (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Lagos PropertyChain</h1>
              <p className="text-xs text-gray-600">Blockchain Property Management</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">How It Works</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Contact</a>
            
            {connectedWallet ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">Wallet Connected</span>
                </div>
                <button 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
                >
                  Enter Platform
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setIsWalletModalOpen(true)}
                  className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Connect Wallet</span>
                </button>
                <button 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Testimonials</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Contact</a>
              
              {!connectedWallet && (
                <button 
                  onClick={() => setIsWalletModalOpen(true)}
                  className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 w-full"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Connect Wallet</span>
                </button>
              )}
              
              <button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 w-full"
              >
                {connectedWallet ? 'Enter Platform' : 'Get Started'}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );

  const Hero = () => (
    <section className="pt-24 pb-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                <Award className="h-4 w-4" />
                <span>Powered by Cardano Blockchain</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                The Future of
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Property Management</span>
                in Lagos
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience transparent, secure, and efficient property transactions with blockchain-verified e-numbers, smart tax collection, and integrated utility services powered by Cardano.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {connectedWallet ? (
                <button 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Enter Platform</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setIsWalletModalOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Wallet className="h-5 w-5" />
                    <span>Connect Wallet</span>
                  </button>
                  <button 
                    onClick={onGetStarted}
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Try Demo</span>
                    <Play className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">150K+ Active Users</span>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-2">4.9/5 Rating</span>
              </div>
            </div>

            {connectedWallet && (
              <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">Wallet Connected</p>
                    <p className="text-sm text-green-600">Ready for blockchain transactions</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Modern Lagos Property"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-bold text-gray-900">Blockchain Verified</p>
                    <p className="text-sm text-gray-600">E-Number: LG-VI-2024-001</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">₦2.5M</p>
                  <p className="text-sm text-gray-600">Annual Rent</p>
                </div>
              </div>
              {connectedWallet && (
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2">
                  <Link className="h-4 w-4" />
                  <span>On-Chain</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Stats = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-4">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const Features = () => (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Revolutionary Features for Modern Property Management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combining Cardano blockchain technology with practical solutions to transform how Lagos manages properties, taxes, and utilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <button className="mt-6 text-green-600 font-semibold hover:text-green-700 transition-colors flex items-center space-x-2">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const BlockchainSection = () => (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Wallet className="h-4 w-4" />
            <span>Powered by Cardano</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Secure Blockchain Infrastructure
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Built on Cardano's proof-of-stake blockchain for maximum security, sustainability, and transparency in property management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Immutable Records",
              description: "All property transactions and ownership records are permanently stored on the Cardano blockchain, ensuring complete transparency and preventing fraud."
            },
            {
              icon: Zap,
              title: "Smart Contracts",
              description: "Automated tax collection and utility payments through secure smart contracts, reducing bureaucracy and ensuring timely transactions."
            },
            {
              icon: Globe,
              title: "Decentralized Trust",
              description: "No single point of failure. The decentralized nature of Cardano ensures your property data is always accessible and secure."
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-blue-100 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => setIsWalletModalOpen(true)}
            className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
          >
            <Wallet className="h-5 w-5" />
            <span>Connect Your Cardano Wallet</span>
          </button>
        </div>
      </div>
    </section>
  );

  const HowItWorks = () => (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How PropertyChain Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple, secure process that connects property owners, tenants, and government services through Cardano blockchain technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Connect Wallet",
              description: "Connect your Cardano wallet to access secure blockchain features and verify your identity.",
              icon: Wallet,
              color: "from-blue-600 to-cyan-600"
            },
            {
              step: "02", 
              title: "Property Registration",
              description: "Register your property and receive a blockchain-verified e-number certificate stored on Cardano.",
              icon: Building2,
              color: "from-green-600 to-emerald-600"
            },
            {
              step: "03",
              title: "Smart Payments",
              description: "Pay property taxes and utilities through secure smart contracts with transparent allocation tracking.",
              icon: CreditCard,
              color: "from-purple-600 to-pink-600"
            },
            {
              step: "04",
              title: "Marketplace Access",
              description: "List or browse verified properties in our secure digital marketplace with on-chain verification.",
              icon: Globe,
              color: "from-orange-600 to-red-600"
            }
          ].map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl mb-6 relative`}>
                  <Icon className="h-10 w-10 text-white" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-900 shadow-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const Testimonials = () => (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied property owners, tenants, and government officials who trust PropertyChain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">"{testimonial.content}"</p>
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const CTA = () => (
    <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Property Experience?
        </h2>
        <p className="text-xl text-green-100 mb-8 leading-relaxed">
          Join the blockchain revolution in Lagos property management. Connect your Cardano wallet and experience secure, transparent, and efficient property transactions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {connectedWallet ? (
            <button 
              onClick={onGetStarted}
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Enter Platform Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <>
              <button 
                onClick={() => setIsWalletModalOpen(true)}
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Wallet className="h-5 w-5" />
                <span>Connect Wallet</span>
              </button>
              <button 
                onClick={onGetStarted}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Try Demo</span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Lagos PropertyChain</h3>
                <p className="text-sm text-gray-400">Cardano-Powered Property Management</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Revolutionizing property management in Lagos through Cardano blockchain technology, transparency, and innovation.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tax Payment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Utilities</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Blockchain</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Cardano Integration</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Smart Contracts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wallet Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">On-Chain Verification</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2024 Lagos PropertyChain. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400">Powered by Cardano Blockchain</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Blockchain Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <BlockchainSection />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
      
      <WalletConnection
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onWalletConnected={handleWalletConnected}
      />
    </div>
  );
};

export default LandingPage;