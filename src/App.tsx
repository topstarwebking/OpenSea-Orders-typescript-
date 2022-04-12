import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import DataGridDemo from './components/Table';
import { useMoralis } from "react-moralis";
import { Button } from '@mui/material';
import { GridCellEditCommitParams, MuiBaseEvent, MuiEvent } from '@mui/x-data-grid';
import { BuyOrderInterface } from './interfaces/buyOrderInterface';
import config from './config/config';
import {ethers} from 'ethers';
import { OpenSeaPort, Network } from 'opensea-js';
import Web3 from 'web3';
import useProvider from './hook/useProvider';
import useSeaport from './hook/useSeaport';
import useOrders from './hook/useOrders';
import { WyvernSchemaName } from "opensea-js/lib/types";

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
function App() {
  const [provider, web3, account, connectWeb3, disconnectWeb3] = useProvider();
  const seaport = useSeaport();
  const [orders, setOrders] = useOrders(seaport);

  const [buyOrders, setBuyOrders] = useState<BuyOrderInterface[]>([]);
  
  const getPaymentToken = (tokenAddress: string): string => {
    if (tokenAddress == ethers.constants.AddressZero) {
      return WETH;
    } else {
      return tokenAddress;
    }
  }

  const onCellEditCommit = async (params: GridCellEditCommitParams, event: MuiEvent<MuiBaseEvent>) => {
    console.log('onCellCommit: ', params);
    let expirationTime;
    
    let hash = params.id;
    let orderNFT = orders?.find(order => order.hash == hash);
    let buyOrder: BuyOrderInterface = {
        network: config.network,
        hash: orderNFT.hash,
        tokenAddress: orderNFT.asset.tokenAddress,
        tokenId: orderNFT.asset.tokenId,
        expirationTime: orderNFT.expirationTime,
        tokenType: orderNFT.asset.assetContract.schemaName,
        paymentTokenAddress: getPaymentToken(orderNFT.paymentToken),
        userAddress: account,
        amount: orderNFT.amount
    };
    let updatedValue = params.value as number || 0;
    let index = orders.findIndex(order => order.hash == hash);

    let updatedOrder;

    if (params.field === 'amount') {
      buyOrder = {
        ...buyOrder,
        amount: updatedValue,
      }
      updatedOrder = {
        ...orderNFT,
        amount: updatedValue
      }
    } else if (params.field === 'expirationTime') {
      expirationTime = updatedValue;
      buyOrder = {
        ...buyOrder,
        expirationTime: expirationTime,
      }
      updatedOrder = {
        ...orderNFT,
        expirationTime
      }
    }

    let _orders: any[] = [...orders];
    _orders.splice(index, 1, updatedOrder);
    setOrders(_orders);
    console.log('_orders: ', _orders);
    let _buyOrders = buyOrders.filter(_order => _order.hash != buyOrder.hash) || [];
    if (params.field === 'expirationTime' || params.field === 'amount') {
      if (buyOrder.amount > 0) {
        setBuyOrders([
          ..._buyOrders,
          buyOrder
        ]); 
      } else {
        setBuyOrders(_buyOrders);
      }
    }
  }

  const onCellAllSet = (row: any, field: string) => {
    let value = row[field];
    if (!value) return;
    let _orders = orders.map(order => {
      let _order = {
        ...order,
      }
      _order[field] = value;
      return _order;
    }) || [];
    setOrders(_orders);
    let _buyOrders = _orders.map(_order => {
      let buyOrder: BuyOrderInterface = {
        network: config.network,
        hash: _order.hash,
        tokenAddress: _order.asset.tokenAddress,
        tokenId: _order.asset.tokenId,
        expirationTime: _order.expirationTime,
        tokenType: _order.asset.assetContract.schemaName,
        paymentTokenAddress: getPaymentToken(_order.paymentToken),
        userAddress: account,
        amount: _order.amount,
      };
      buyOrder[field as 'expirationTime' | 'amount'] = value;
      return buyOrder;
    });
    setBuyOrders(_buyOrders);
  }

  const getTokenType = (tokenType: string): WyvernSchemaName => {
    let schemaName = WyvernSchemaName.ERC721;

    switch (tokenType) {
      case 'ERC1155':
        schemaName = WyvernSchemaName.ERC1155;
        break;
      default:
        schemaName = WyvernSchemaName.ERC721;
        break;
    }
    return schemaName;
  }

  const handleSubmit = async (event: any) => {
    console.log('buyOrders: ', buyOrders);
    for (let order of buyOrders) {
      const offer = await seaport?.createBuyOrder({
        asset: {
          tokenId: order.tokenId,
          tokenAddress: order.tokenAddress,
          schemaName: getTokenType(order.tokenType) // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
        },
        accountAddress: account,
        // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
        startAmount: order.amount,
      })
    }
    console.log("Create Buy Order Successful");
  }

  const handleCancel = () => {
    let _orders = orders.map(order => {
      return {
        ...order,
        expirationTime: '',
        amount: 0
      }
    });
    setOrders(_orders);
    setBuyOrders([]);
  }

  return (
    <div className="App">
      <div>
					{account ? (
						<div>
							<div style={{color: 'white'}}>{account}</div>
						</div>
					) : (
						<Button onClick={() => connectWeb3()}>
							Connect to Metamask
						</Button>
					)}
				</div>
      <DataGridDemo rows={orders} onCellEditCommit={onCellEditCommit} onCellAllSet={onCellAllSet}/>
      <div className="btn-layout">
        <Button variant="text" className="btn">My Bids</Button>
        <Button variant="outlined" className="btn btn-cancel" onClick={handleCancel}>Cancel</Button>
        <Button variant="contained" className="btn btn-submit" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}

export default App;
