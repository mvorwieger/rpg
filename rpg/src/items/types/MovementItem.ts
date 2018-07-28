import {Item} from '../Item'
import {MoveBehaviour} from '../Behaviours/MoveBehaviour'

export interface MovementItem extends Item {
    behaviour: MoveBehaviour
}