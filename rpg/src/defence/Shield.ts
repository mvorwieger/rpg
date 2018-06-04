import {DefenceBehaviour} from '../interfaces/DefenceBehaviour';

export class Shield implements DefenceBehaviour {
    private _blockPercentage: number;
    private _blockAmount: number;

    constructor(blockPercentage: number, blockAmount: number) {
        this._blockPercentage = blockPercentage;
        this._blockAmount = blockAmount;
    }

    block(): number {
        if (Math.floor((Math.random() * 100) + 1) >= this._blockPercentage) {
            return this._blockAmount
        } else return null;
    }
}