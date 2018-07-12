import {AttackBehaviour} from '../Behaviours/AttackBehaviour';

export class NoAttack implements AttackBehaviour {
    attackDamage: number;
    attack = () => this.attackDamage;

    constructor(attackDamage: number) {
        this.attackDamage = attackDamage
    }
}