import {AttackBehaviour} from '../interfaces/AttackBehaviour';

export class Punch implements AttackBehaviour {
    attackDamage: number = 1;
    attack = () => this.attackDamage;
}