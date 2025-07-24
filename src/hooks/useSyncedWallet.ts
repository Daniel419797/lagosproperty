import { useWallet } from '@meshsdk/react';
import { useState, useEffect } from 'react';

export const useSyncedWallet = () => {
  const { connected, wallet, name: walletName, connect, disconnect } = useWallet();
  const [address, setAddress] = useState<string>('');
  const [balanceLovelace, setBalanceLovelace] = useState<string>('0');
  const [balanceADA, setBalanceADA] = useState<string>('0');
  const [network, setNetwork] = useState<'mainnet' | 'testnet'>('testnet');

  const connectWallet = async (walletKey: string) => {
    await connect(walletKey);
  };

  const disconnectWallet = () => {
    disconnect();
    setAddress('');
    setBalanceLovelace('0');
    setBalanceADA('0');
  };

  useEffect(() => {
    const fetchWalletData = async () => {
      if (wallet) {
        const usedAddresses = await wallet.getUsedAddresses();
        const primaryAddress = usedAddresses[0];
        setAddress(primaryAddress);

        const lovelace = await wallet.getLovelace();
        setBalanceLovelace(lovelace);
        setBalanceADA((Number(lovelace) / 1_000_000).toFixed(2));

        const networkId = await wallet.getNetworkId();
        setNetwork(networkId === 1 ? 'mainnet' : 'testnet');
      }
    };

    if (connected) {
      fetchWalletData();
    }
  }, [wallet, connected]);

  return {
    connected,
    walletName,
    address,
    network,
    balanceLovelace,
    balanceADA,
    connectWallet,
    disconnectWallet,
  };
};
