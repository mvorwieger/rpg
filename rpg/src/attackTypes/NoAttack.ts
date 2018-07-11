import {AttackBehaviour} from '../interfaces/Behaviours/AttackBehaviour';
import {WeaponBaseValues} from '../items/defaults/WeaponBaseValues';

export class NoAttack implements AttackBehaviour {
    attackDamage: number;
    attack = () => this.attackDamage;

    constructor(attackDamage: number) {
        this.attackDamage = attackDamage
    }
}