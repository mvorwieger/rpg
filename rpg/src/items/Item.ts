import {AttackBehaviour} from './Behaviours/AttackBehaviour';
import {MoveBehaviour} from './Behaviours/MoveBehaviour';
import {DefenceBehaviour} from './Behaviours/DefenceBehaviour';
import {Behaviour} from './Behaviours/Behaviour';

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