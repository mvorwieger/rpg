import {Behaviour, BehaviourNames} from './Behaviour'

export class DefenceBehaviour implements Behaviour {
    constructor(public blockPercentage: number, public blockAmount: number) {
    }

    public block(): number {
        const random = Math.floor((Math.random() * 100) + 1)

        if (random <= this.blockPercentage) {
            return this.blockAmount
        } else return null
    }

    get values() {
        return {
            blockPercentage: this.blockPercentage,
            blockAmount: this.blockAmount
        }
    }

    get type() {
        return BehaviourNames.DefenceBehaviour
    }
}