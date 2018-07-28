import {Item} from '../Item'
import {AttackBehaviour} from '../Behaviours/AttackBehaviour'

export interface WeaponItem extends Item {
    behaviour: AttackBehaviour
}