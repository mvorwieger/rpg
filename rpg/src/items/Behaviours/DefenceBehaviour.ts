import {Behaviour} from './Behaviour'

export class DefenceBehaviour implements Behaviour{
    constructor(public blockPercentage: number, public blockAmount: number) { }

    public block(): number {
        const random = Math.floor((Math.random() * 100) + 1);

        if (random <= this.blockPercentage) {
            return this.blockAmount
        } else return null;
    }
}