import {AttackBehaviour} from './interfaces/Behaviours/AttackBehaviour';
import {MoveBehaviour} from './interfaces/Behaviours/MoveBehaviour';
import {DefenceBehaviour} from './interfaces/Behaviours/DefenceBehaviour';

export class Item {
    rarity: string;
    value: number;
    name: string;
    behaviour: AttackBehaviour | MoveBehaviour | DefenceBehaviour;

    constructor(
        rarity: string,
        value: number,
        name: string,
        behaviour: AttackBehaviour | MoveBehaviour | DefenceBehaviour
    ) {
        this.rarity = rarity;
        this.value = value;
        this.name = name;
        this.behaviour = behaviour;
    }
}