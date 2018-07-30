import {Behaviour, BehaviourNames} from './Behaviour'

export class MoveBehaviour implements Behaviour {
    public move = () => this.moveSpeed

    constructor(public moveSpeed: number) {
    }

    get values() {
        return {
            moveSpeed: this.moveSpeed
        }
    }

    get type() {
        return BehaviourNames.MoveBehaviour
    }
}
