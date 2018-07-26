import {Wallet} from "./Wallet";

/**
 * This interface might not be needed but was created to validate that and Entity is valid for Trading
 */
export interface Transactor {
    pay: (amount: number, sellerWaller: Wallet) => boolean
}