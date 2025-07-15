// Cardano wallet integration utilities
export interface CardanoWallet {
  name: string;
  icon: string;
  api?: any;
  isEnabled: boolean;
}

export interface WalletInfo {
  address: string;
  balance: number;
  network: 'mainnet' | 'testnet';
  stakeAddress?: string;
}

// Available Cardano wallets
export const SUPPORTED_WALLETS = [
  {
    name: 'Nami',
    key: 'nami',
    icon: '🦎',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    name: 'Eternl',
    key: 'eternl',
    icon: '♾️',
    color: 'from-purple-600 to-pink-600'
  },
  {
    name: 'Flint',
    key: 'flint',
    icon: '🔥',
    color: 'from-orange-600 to-red-600'
  },
  {
    name: 'Yoroi',
    key: 'yoroi',
    icon: '🏛️',
    color: 'from-green-600 to-emerald-600'
  },
  {
    name: 'Typhon',
    key: 'typhoncip30',
    icon: '🌊',
    color: 'from-teal-600 to-blue-600'
  },
  {
    name: 'GeroWallet',
    key: 'gerowallet',
    icon: '⚡',
    color: 'from-yellow-600 to-orange-600'
  }
];

// Check if wallet is installed
export const isWalletInstalled = (walletKey: string): boolean => {
  return typeof window !== 'undefined' && window.cardano && window.cardano[walletKey];
};

// Get available wallets
export const getAvailableWallets = (): CardanoWallet[] => {
  if (typeof window === 'undefined') return [];
  
  return SUPPORTED_WALLETS.map(wallet => ({
    name: wallet.name,
    icon: wallet.icon,
    api: window.cardano?.[wallet.key],
    isEnabled: isWalletInstalled(wallet.key)
  }));
};

// Connect to wallet
export const connectWallet = async (walletKey: string): Promise<WalletInfo | null> => {
  try {
    if (!isWalletInstalled(walletKey)) {
      throw new Error(`${walletKey} wallet is not installed`);
    }

    const walletApi = window.cardano[walletKey];
    const api = await walletApi.enable();
    
    // Get wallet address
    const addresses = await api.getUsedAddresses();
    const address = addresses[0];
    
    // Get balance (simplified - in real implementation you'd query the blockchain)
    const balance = await api.getBalance();
    
    // Get network info
    const networkId = await api.getNetworkId();
    const network = networkId === 1 ? 'mainnet' : 'testnet';
    
    // Get stake address
    const rewardAddresses = await api.getRewardAddresses();
    const stakeAddress = rewardAddresses[0];

    return {
      address: address || 'addr1...',
      balance: parseInt(balance) / 1000000 || 0, // Convert from lovelace to ADA
      network,
      stakeAddress
    };
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    throw error;
  }
};

// Format ADA amount
export const formatADA = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(amount) + ' ADA';
};

// Shorten address for display
export const shortenAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 8)}...${address.slice(-8)}`;
};

// Declare global cardano object
declare global {
  interface Window {
    cardano?: {
      [key: string]: {
        enable: () => Promise<any>;
        isEnabled: () => Promise<boolean>;
        apiVersion: string;
        name: string;
        icon: string;
      };
    };
  }
}