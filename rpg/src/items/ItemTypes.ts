import {Item} from '../Item';
import {MoveBehaviour} from '../interfaces/Behaviours/MoveBehaviour';
import {DefenceBehaviour} from '../interfaces/Behaviours/DefenceBehaviour';
import {AttackBehaviour} from '../interfaces/Behaviours/AttackBehaviour';

export interface WeaponItem extends Item {
    behaviour: AttackBehaviour
}

export interface FootItem extends Item {
    behaviour: MoveBehaviour
}

export interface ShieldItem extends Item {
    behaviour: DefenceBehaviour
}