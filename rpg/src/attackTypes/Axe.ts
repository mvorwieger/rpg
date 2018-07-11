import {AttackBehaviour} from '../interfaces/Behaviours/AttackBehaviour';

export class Axe implements AttackBehaviour {
    attackDamage: number;
    attack = () => this.attackDamage;

    // TODO: ADD specific Axe Behaviour

    constructor(attackDamage: number) {
        this.attackDamage = attackDamage;
    }
}