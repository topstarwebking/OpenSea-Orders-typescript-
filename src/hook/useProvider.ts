import { useEffect, useState } from "react";
import Web3 from "web3";

declare let window: any;
const useProvider = (): [any, any, any, any, any] => {
  
  const [web3, setWeb3] = useState<Web3>();
  const [provider, setProvider] = useState<any>();
  const [account ,setAccount] = useState();

  const connectWeb3 = async () => {
    let res = await window.ethereum.enable();
    console.log('connectWeb3: ', res);
    if (res && res.length > 0) {
      setAccount(res[0]);
    }
  }

  const disconnectWeb3 = async () => {
    await window.ethereum.close();
    setAccount(undefined);
  }

  useEffect(() => {
      
      if (window.ethereum) {
        setProvider(window.ethereum)
        setWeb3(new Web3(window.ethereum));
        connectWeb3();
      }
  }, [])

  return [provider, web3, account, connectWeb3, disconnectWeb3];
};

export default useProvider;
