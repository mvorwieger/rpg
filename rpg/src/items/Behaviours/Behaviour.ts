import {AttackBehaviour} from './AttackBehaviour';
import {DefenceBehaviour} from './DefenceBehaviour';
import {MoveBehaviour} from './MoveBehaviour';

export type Behaviour = AttackBehaviour | DefenceBehaviour | MoveBehaviour

export function instanceOfAttackBehaviour(behaviour: any): behaviour is AttackBehaviour {
    return Boolean(behaviour.attack);
}

export function instanceOfDefenceBehaviour(behaviour: any): behaviour is DefenceBehaviour {
    return Boolean(behaviour.block);
}

export function instanceOfMoveBehaviour(behaviour: any): behaviour is MoveBehaviour {
    return Boolean(behaviour.move);
}
