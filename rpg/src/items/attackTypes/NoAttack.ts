import {AttackBehaviour} from '../Behaviours/AttackBehaviour';
import {WeaponBaseValues} from '../ItemDefaults/WeaponBaseValues';

export class NoAttack implements AttackBehaviour {
    attackDamage: number;
    attack = () => this.attackDamage;

    constructor(attackDamage: number) {
        this.attackDamage = attackDamage
    }
}