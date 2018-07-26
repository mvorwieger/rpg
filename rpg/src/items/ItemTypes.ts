import {Item} from './Item';
import {MoveBehaviour} from './Behaviours/MoveBehaviour';
import {DefenceBehaviour} from './Behaviours/DefenceBehaviour';
import {AttackBehaviour} from './Behaviours/AttackBehaviour';

export interface WeaponItem extends Item {
    behaviour: AttackBehaviour
}

export interface MovementItem extends Item {
    behaviour: MoveBehaviour
}

export interface DefenceItem extends Item {
    behaviour: DefenceBehaviour
}