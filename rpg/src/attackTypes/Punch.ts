import {AttackBehaviour} from '../interfaces/Behaviours/AttackBehaviour';

export class Punch implements AttackBehaviour {
    attackDamage: number;
    attack = () => this.attackDamage;

    constructor(attackDamage: number) {
        this.attackDamage = attackDamage;
    }
}