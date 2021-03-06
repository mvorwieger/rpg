export class Wallet {
    /**
     * Adds money to the existing money
     * @param {number} amount
     */
    public add = (amount: number) => {
        this.moneyAmount += amount
    }
    /**
     * Subtracts money from the existing money and returns true if it succeeded and false if it failed
     * it fails if the subtraction amount is over the current money amount
     * @param {number} amount
     * @return {boolean} Transaction Successful
     */
    public sub = (amount: number): boolean => {
        if (this.moneyAmount - amount >= 0) {
            this.moneyAmount -= amount
            return true
        }
        return false
    }
    /**
     * Transacts the amount from one wallet to another
     * @param {number} amount
     * @param {Wallet} sellerWaller
     * @return {boolean} Transaction Successful
     */
    public pay = (amount: number, sellerWaller: Wallet): boolean => {
        if (this.sub(amount)) {
            sellerWaller.add(amount)
            return true
        }
        return false
    }

    constructor(private moneyAmount = 0) {
        this.moneyAmount = moneyAmount
    }

    /**
     * Gives u the money Amount of the wallet
     * @return {number | undefined}
     */
    public get money() {
        return this.moneyAmount
    }
}