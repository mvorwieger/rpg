import {Item} from '../Item'
import {DefenceBehaviour} from '../Behaviours/DefenceBehaviour'

export interface DefenceItem extends Item {
    behaviour: DefenceBehaviour
}