import {Item} from '../Item';
import {MoveBehaviour} from '../interfaces/Behaviours/MoveBehaviour';
import {DefenceBehaviour} from '../interfaces/Behaviours/DefenceBehaviour';
import {AttackBehaviour} from '../interfaces/Behaviours/AttackBehaviour';

export interface WeaponItem extends Item {
    behaviour: AttackBehaviour
}

export interface MovementItem extends Item {
    behaviour: MoveBehaviour
}

export interface DefenceItem extends Item {
    behaviour: DefenceBehaviour
}