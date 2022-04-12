export interface BuyOrderInterface {
    hash: string,
    network: string,
    tokenAddress: string,
    tokenId: string,
    tokenType: string,
    amount: number,
    userAddress: string,
    expirationTime: number | string | undefined
    paymentTokenAddress: string,
}