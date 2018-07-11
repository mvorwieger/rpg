import {AttackBehaviour} from '../interfaces/Behaviours/AttackBehaviour';

export class Sword implements AttackBehaviour {
    attackDamage: number;
    attack = () => this.attackDamage;

    // TODO: ADD specific Sword Behaviour

    constructor(attackDamage: number) {
        this.attackDamage = attackDamage;
    }
}