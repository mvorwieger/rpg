import {Troll} from './Troll'
import {DefenceBehaviour} from '../../items/Behaviours/DefenceBehaviour'
import {AttackBehaviour} from '../../items/Behaviours/AttackBehaviour'
import {MoveBehaviour} from '../../items/Behaviours/MoveBehaviour'

export class NpcFactory {
    public static createTroll = () => new Troll(new MoveBehaviour(1), new AttackBehaviour(3), new DefenceBehaviour(0, 0))
}