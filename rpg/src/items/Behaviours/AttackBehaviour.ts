import {Behaviour} from './Behaviour'

export class AttackBehaviour implements Behaviour{
    constructor(public attackDamage: number) {}
    attack = () => this.attackDamage
}