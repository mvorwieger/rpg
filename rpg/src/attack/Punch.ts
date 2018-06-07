import {AttackBehaviour} from '../interfaces/Behaviours/AttackBehaviour';
import {AttackDamage} from '../items/defaults/AttackDamages';

export class Punch implements AttackBehaviour {
    attackDamage: number;
    attack = () => this.attackDamage;

    constructor(attackDamage: number = AttackDamage.punch) {
        this.attackDamage = attackDamage;
    }
}