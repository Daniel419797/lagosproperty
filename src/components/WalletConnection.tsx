import React, { useState, useEffect } from 'react';
import { CheckCircle, Shield, Wallet, AlertCircle, Copy, ExternalLink, Loader, X, Download } from 'lucide-react';
import { getAvailableWallets, SUPPORTED_WALLETS, WalletInfo } from '../lib/cardano';
import { useSyncedWallet } from '../hooks/useSyncedWallet';

interface WalletConnectionProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletConnected?: (walletInfo: WalletInfo | null) => void; // ✅ OPTIONAL prop
}


const WalletConnection: React.FC<WalletConnectionProps> = ({ isOpen, onClose }) => {
  const [availableWallets, setAvailableWallets] = useState<any[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    connected,
    walletName,
    address,
    network,
    balanceADA,
    connectWallet,
    disconnectWallet,
  } = useSyncedWallet();

  useEffect(() => {
    if (isOpen) {
      setAvailableWallets(getAvailableWallets());
    }
  }, [isOpen]);

  const handleConnect = async (walletKey: string) => {
    setConnecting(walletKey);
    setError(null);

    try {
      await connectWallet(walletKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setConnecting(null);
    }
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Connect Cardano Wallet</h3>
              <p className="text-sm text-gray-600">Secure blockchain authentication</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {!connected ? (
            <>
              <div className="text-center space-y-2 mb-6">
                <Shield className="h-12 w-12 text-blue-600 mx-auto" />
                <h4 className="text-lg font-semibold">Secure Wallet Connection</h4>
                <p className="text-gray-600 text-sm">
                  Connect your Cardano wallet to access blockchain-verified property features.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-red-800 text-sm font-medium">Connection Failed</p>
                    <p className="text-red-700 text-xs mt-1">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <h5 className="font-medium text-gray-900">Available Wallets</h5>
                {SUPPORTED_WALLETS.map((wallet) => {
                  const isInstalled = availableWallets.some(w => w.name === wallet.name && w.isEnabled);
                  const isConnecting = connecting === wallet.key;

                  return (
                    <button
                      key={wallet.key}
                      onClick={() => isInstalled ? handleConnect(wallet.key) : null}
                      disabled={!isInstalled || isConnecting}
                      className={`w-full flex items-center justify-between p-4 border rounded-xl transition-all ${
                        isInstalled
                          ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
                          : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${wallet.color} rounded-xl flex items-center justify-center text-lg`}>
                          {wallet.icon}
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{wallet.name}</p>
                          <p className="text-sm text-gray-600">{isInstalled ? 'Ready to connect' : 'Not installed'}</p>
                        </div>
                      </div>
                      {isConnecting ? (
                        <Loader className="h-5 w-5 text-blue-600 animate-spin" />
                      ) : isInstalled ? (
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      ) : (
                        <Download className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
                <Shield className="h-5 w-5 text-blue-600 mb-2" />
                <p className="font-medium">Why Connect?</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Verify property ownership on-chain</li>
                  <li>Secure smart contract interactions</li>
                  <li>Access exclusive blockchain features</li>
                  <li>Transparent transaction history</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="text-center space-y-2 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold">Wallet Connected Successfully!</h4>
                <p className="text-gray-600 text-sm">
                  Your Cardano wallet is now connected and ready for blockchain transactions.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Network</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    network === 'mainnet'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {network?.toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Balance</span>
                  <span className="font-bold text-gray-900">{balanceADA} ADA</span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">Address</span>
                    <button
                      onClick={copyAddress}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span className="text-xs">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-sm font-mono text-gray-900 break-all">{address}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-red-400 transition-colors"
                >
                  Disconnect
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700"
                >
                  Continue to Platform
                </button>
                <button
                  onClick={() => window.open('https://cardanoscan.io', '_blank')}
                  className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;
