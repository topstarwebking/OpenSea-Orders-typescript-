import { Network, OpenSeaPort } from "opensea-js";
import { useEffect, useState } from "react";
import config from "../config/config";
import useProvider from "./useProvider";

const useSeaport = () => {
  const [provider, , , ,] = useProvider();
  const [seaport, setSeaport] = useState<OpenSeaPort>();
  console.log('provider: ', provider)
  useEffect(() => {
    if (provider) {
      const _seaport = new OpenSeaPort(provider, {
        networkName: Network.Main,
        apiKey: config.openseaAPIKey,
      });
      setSeaport(_seaport)
    }
  }, provider)
  
  return seaport;
};

export default useSeaport;
