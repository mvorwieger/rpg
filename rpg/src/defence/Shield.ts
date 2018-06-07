import {DefenceBehaviour} from '../interfaces/DefenceBehaviour';

export class Shield implements DefenceBehaviour {
    private _blockPercentage: number;
    private _blockAmount: number;

    constructor(blockPercentage: number, blockAmount: number) {
        this._blockPercentage = blockPercentage;
        this._blockAmount = blockAmount;
    }

    public block(): number {
        const random = Math.floor((Math.random() * 100) + 1);

        if (random <= this._blockPercentage) {
            return this._blockAmount
        } else return null;
    }

    public get blockAmount() {
        return this._blockAmount
    }

    public get blockPercentage() {
        return this._blockPercentage
    }
}