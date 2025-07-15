# Lagos PropertyChain

A blockchain-powered property management platform for Lagos State featuring verified digital marketplace, smart tax escrow, and integrated utility services built on Cardano blockchain.

## 🌟 Features

### 🏢 **Verified Digital Marketplace**
- Browse and transact with blockchain-verified properties
- Every listing comes with authenticated e-numbers and compliance history
- Secure property transactions with Cardano wallet integration

### 🛡️ **Smart Tax Escrow System**
- Transparent property tax collection with blockchain-powered smart contracts
- Track exactly how your taxes are allocated and used
- Automated compliance checking and reporting

### ⚡ **Integrated Utility Services**
- Seamlessly connect water, electricity, and waste services to your property
- Only tax-compliant properties maintain active services
- Automated billing and payment processing

### 💳 **Stripe Payment Integration**
- Secure payment processing for taxes, utilities, and property transactions
- Support for Nigerian Naira (₦) with proper formatting
- Real-time payment confirmation and blockchain recording

### 🔗 **Cardano Blockchain Integration**
- Connect popular Cardano wallets (Nami, Eternl, Flint, Yoroi, etc.)
- Immutable property records and transaction history
- Smart contract automation for compliance and payments

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Stripe account for payments
- Cardano wallet (optional, for blockchain features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lagos-propertychain.git
   cd lagos-propertychain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the backend API (optional)**
   ```bash
   cd server
   npm install
   npm run dev
   ```

### Stripe Setup

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Get your API keys from the [Developers section](https://dashboard.stripe.com/apikeys)
3. Add the keys to your `.env` file
4. Configure webhooks in your Stripe dashboard pointing to `/webhook`

## 🏗️ Project Structure

```
lagos-propertychain/
├── src/
│   ├── components/          # React components
│   │   ├── LandingPage.tsx     # Beautiful landing page
│   │   ├── PaymentModal.tsx    # Stripe payment interface
│   │   ├── PaymentHistory.tsx  # Transaction history
│   │   └── WalletConnection.tsx # Cardano wallet integration
│   ├── lib/                 # Utility libraries
│   │   ├── stripe.ts           # Stripe configuration
│   │   └── cardano.ts          # Cardano wallet utilities
│   ├── api/                 # API integration
│   │   └── stripe.ts           # Payment API calls
│   └── App.tsx              # Main application
├── server/                  # Backend API
│   ├── index.js                # Express server
│   └── package.json            # Backend dependencies
├── public/                  # Static assets
└── README.md               # This file
```

## 💳 Payment Features

### Supported Payment Types
- **Property Tax**: Automated tax collection with blockchain transparency
- **Utility Bills**: Water, electricity, and waste management payments
- **Property Transactions**: Rent payments and property purchases

### Payment Methods
- Credit/Debit Cards (Visa, Mastercard, Verve)
- Bank Transfer (coming soon)
- Cardano wallet integration for blockchain transactions

### Currency Support
- Nigerian Naira (₦) with proper formatting
- Automatic conversion between Naira and kobo
- Real-time exchange rates and fee calculation

## 🔗 Blockchain Integration

### Supported Wallets
- **Nami** - Popular Cardano wallet
- **Eternl** - Feature-rich wallet with staking
- **Flint** - Mobile-first Cardano wallet
- **Yoroi** - EMURGO's official wallet
- **Typhon** - Advanced DeFi features
- **GeroWallet** - Multi-chain support

### Blockchain Features
- Property ownership verification
- Immutable transaction records
- Smart contract automation
- Decentralized identity management

## 🎨 Design System

### Color Palette
- **Primary**: Green (#059669) - Lagos State official color
- **Secondary**: Emerald (#10b981) - Growth and prosperity
- **Accent**: Blue (#3b82f6) - Trust and reliability
- **Success**: Green (#22c55e) - Positive actions
- **Warning**: Yellow (#eab308) - Attention needed
- **Error**: Red (#ef4444) - Critical issues

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular weight
- **Code**: JetBrains Mono for technical content

## 🚀 Deployment

### Frontend Deployment (Netlify)
The application is configured for easy deployment to Netlify:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Backend Deployment
The backend can be deployed to any Node.js hosting service:

1. Deploy the `server` folder
2. Set environment variables for Stripe keys
3. Configure webhook endpoints in Stripe dashboard

## 🧪 Testing

### Test Cards (Stripe)
- **Success**: `4242424242424242`
- **Declined**: `4000000000000002`
- **Requires Authentication**: `4000002500003155`

### Test Scenarios
- Property tax payments
- Utility bill payments
- Property purchase transactions
- Wallet connection flows
- Payment history display

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@lagospropertchain.com
- Documentation: [docs.lagospropertchain.com](https://docs.lagospropertchain.com)

## 🙏 Acknowledgments

- Lagos State Government for property management insights
- Cardano Foundation for blockchain infrastructure
- Stripe for secure payment processing
- React and Vite communities for excellent tooling

---

**Built with ❤️ for Lagos State property management**