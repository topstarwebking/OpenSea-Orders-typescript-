import { OpenSeaPort } from "opensea-js";
import { OrderSide } from "opensea-js/lib/types";
import { useEffect, useState } from "react";

const useOrders = (seaport: OpenSeaPort | undefined): [any[], any] => {
  const [_orders, setOrders] = useState<any[]>();
  const [_count, setCount] = useState<Number>();
  
  useEffect(() => {
    async function getOrders() {
      if (seaport) {
        const { orders, count } = await seaport.api.getOrders({
          side: OrderSide.Sell,
        });
        
        let __orders = orders || [];
        let _values = [];
        _values = __orders.map((value: any) => {
          return {
            ...value,
            ...value.asset,
            expirationTime: ''
          }
        })
        
        console.log('orders: ', _values);
        setOrders(_values || []);
      }
    }
    if (seaport) {
      getOrders();
    }
  }, [seaport]);

  return [_orders || [], setOrders];
};

export default useOrders;
