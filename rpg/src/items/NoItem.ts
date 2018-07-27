import {Item} from './Item'
import {Rarity} from './defaults/Raritys'
import {AttackBehaviour} from './Behaviours/AttackBehaviour'
import {MoveBehaviour} from './Behaviours/MoveBehaviour'
import {DefenceBehaviour} from './Behaviours/DefenceBehaviour'

export class NoAttack extends Item {
    constructor() {
        super(Rarity.none, 0, 'No Attack', new AttackBehaviour(0))
    }
}

export class NoMovement extends Item {
    constructor() {
        super(Rarity.none, 0, 'No Movement', new MoveBehaviour(0))
    }
}

export class NoDefence extends Item {
    constructor() {
        super(Rarity.none, 0, 'No Defence', new DefenceBehaviour(0, 0))
    }
}