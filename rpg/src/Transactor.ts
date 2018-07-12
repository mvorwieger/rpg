import {Wallet} from "./Wallet";

export interface Transactor {
    pay: (amount: number, sellerWaller: Wallet) => boolean
}