import {Behaviour, BehaviourNames} from './Behaviour'

export class AttackBehaviour implements Behaviour {
    attack = () => this.attackDamage

    constructor(public attackDamage: number) {
    }

    get values() {
        return {attackDamage: this.attackDamage}
    }

    get type() {
        return BehaviourNames.AttackBehaviour
    }
}