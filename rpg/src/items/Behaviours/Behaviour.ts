import {AttackBehaviour} from './AttackBehaviour'
import {DefenceBehaviour} from './DefenceBehaviour'
import {MoveBehaviour} from './MoveBehaviour'

export interface Behaviour {
    values: {
        moveSpeed?: number,
        attackDamage?: number,
        blockValue?: number,
        blockPercentage?: number
    }
    type: BehaviourNames.AttackBehaviour | BehaviourNames.DefenceBehaviour | BehaviourNames.MoveBehaviour
}

export enum BehaviourNames {
    AttackBehaviour = 'attack',
    DefenceBehaviour = 'defence',
    MoveBehaviour = 'move'
}

export function instanceOfAttackBehaviour(behaviour: any): behaviour is AttackBehaviour {
    return Boolean(behaviour.attack)
}

export function instanceOfDefenceBehaviour(behaviour: any): behaviour is DefenceBehaviour {
    return Boolean(behaviour.block)
}

export function instanceOfMoveBehaviour(behaviour: any): behaviour is MoveBehaviour {
    return Boolean(behaviour.move)
}

export function getBehaviourType(behaviour: Behaviour): String {
    if (instanceOfAttackBehaviour(behaviour)) return BehaviourNames.AttackBehaviour
    if (instanceOfDefenceBehaviour(behaviour)) return BehaviourNames.DefenceBehaviour
    if (instanceOfMoveBehaviour(behaviour)) return BehaviourNames.MoveBehaviour
    return undefined
}
