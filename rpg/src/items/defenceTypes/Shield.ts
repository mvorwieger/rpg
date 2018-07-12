import {DefenceBehaviour} from '../Behaviours/DefenceBehaviour';

export class Shield implements DefenceBehaviour {
    constructor(public readonly blockPercentage: number,
                public readonly blockAmount: number) {
        this.blockPercentage = blockPercentage;
        this.blockAmount = blockAmount;
    }

    public block(): number {
        const random = Math.floor((Math.random() * 100) + 1);

        if (random <= this.blockPercentage) {
            return this.blockAmount
        } else return null;
    }
}