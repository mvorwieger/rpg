import {AttackBehaviour} from '../interfaces/Behaviours/AttackBehaviour';
import {WeaponBaseValues} from '../items/defaults/WeaponBaseValues';

export class Punch implements AttackBehaviour {
    attackDamage: number;
    attack = () => this.attackDamage;

    constructor(attackDamage: number = WeaponBaseValues.punch) {
        this.attackDamage = attackDamage;
    }
}