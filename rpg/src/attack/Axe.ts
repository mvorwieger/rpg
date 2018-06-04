import {AttackBehaviour} from '../interfaces/AttackBehaviour';

export class Axe implements AttackBehaviour {
    attackDamage: number = 3;
    attack = () => this.attackDamage;
}