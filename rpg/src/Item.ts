import {AttackBehaviour} from './interfaces/Behaviours/AttackBehaviour';
import {MoveBehaviour} from './interfaces/Behaviours/MoveBehaviour';
import {DefenceBehaviour} from './interfaces/Behaviours/DefenceBehaviour';
import {Behaviour} from './interfaces/Behaviours/Behaviour';

export class Item {
    rarity: string;
    value: number;
    name: string;
    behaviour: Behaviour;

    constructor(
        rarity: string,
        value: number,
        name: string,
        behaviour: Behaviour
    ) {
        this.rarity = rarity;
        this.value = value;
        this.name = name;
        this.behaviour = behaviour;
    }
}