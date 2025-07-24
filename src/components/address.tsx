import React from 'react';
import { useAddress } from '@meshsdk/react';
import { useWallet } from '@meshsdk/react';

const Address: React.FC = () => {
  const { wallet, connected, name } = useWallet();
  const address = useAddress();

  return (
    <div>
      {connected ? (address) : ('Not connected')}
    </div>
  );
};

export default Address;
