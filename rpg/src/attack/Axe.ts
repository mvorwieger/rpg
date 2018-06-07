import {AttackBehaviour} from '../interfaces/AttackBehaviour';
import {AttackDamage} from '../items/defaults/AttackDamages';

export class Axe implements AttackBehaviour {
    attackDamage: number;
    attack = () => this.attackDamage;

    // TODO: ADD specific Axe Behaviour

    constructor(attackDamage = AttackDamage.axe) {
        this.attackDamage = attackDamage;
    }
}