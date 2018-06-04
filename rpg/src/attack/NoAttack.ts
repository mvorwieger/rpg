import {AttackBehaviour} from '../interfaces/AttackBehaviour';

export class NoAttack implements AttackBehaviour {
    attackDamage: number = 0;
    attack = () => this.attackDamage;
}