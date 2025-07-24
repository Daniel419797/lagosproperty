import React, { useEffect, useState, useCallback } from 'react';
import { useWallet } from '@meshsdk/react';


export const Balance: React.FC = () => {
  const { connected, wallet } = useWallet();
  const [lovelace, setLovelace] = useState<string>('0');
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshBalance = useCallback(async () => {
    if (!connected || !wallet) return;

    try {
      const walletAssets = await wallet.getBalance();
      setAssets(walletAssets);

      const ada = walletAssets.find((a: any) => a.unit === 'lovelace');
      setLovelace(ada?.quantity || '0');
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      setLovelace('0');
    } finally {
      setLoading(false);
    }
  }, [connected, wallet]);

  useEffect(() => {
    if (!connected || !wallet) return;

    refreshBalance();

    const interval = setInterval(() => {
      refreshBalance();
    }, 10000);

    return () => clearInterval(interval);
  }, [connected, wallet, refreshBalance]);

  if (!connected) {
    return <p className="text-sm text-gray-400">Wallet not connected</p>;
  }

  return (
    <div className="text-white font-semibold">
      {/* You can uncomment this if you want a loading state */}
      {/* {loading ? <p>Fetching balance...</p> : ( */}
      <p>{(parseInt(lovelace) / 1_000_000).toFixed(2)} ₳</p>
      {/* )} */}
    </div>
  );
};
