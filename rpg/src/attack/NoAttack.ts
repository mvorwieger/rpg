import {AttackBehaviour} from '../interfaces/AttackBehaviour';
import {AttackDamage} from '../items/defaults/AttackDamages';

export class NoAttack implements AttackBehaviour {
    attackDamage: number;
    attack = () => this.attackDamage;

    constructor(attackDamage: number = AttackDamage.nothing) {
        this.attackDamage = attackDamage
    }
}