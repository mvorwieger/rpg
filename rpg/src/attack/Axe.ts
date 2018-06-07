import {AttackBehaviour} from '../interfaces/AttackBehaviour';
import {Item} from '../interfaces/Item';

export class Axe implements AttackBehaviour, Item {
    rarity: string = "common";
    value: number = 0;
    name: string = "Axe";
    attackDamage: number = 3;
    attack = () => this.attackDamage;
}