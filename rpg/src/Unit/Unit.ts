import {MoveBehaviour} from '../items/Behaviours/MoveBehaviour'
import {AttackBehaviour} from '../items/Behaviours/AttackBehaviour'
import {DefenceBehaviour} from '../items/Behaviours/DefenceBehaviour'

export class Unit {
    public health: number = 100
    public performMove = (): number => this.moveBehaviour.move()
    public performAttack = (): number => this.attackBehaviour.attack()
    public performDefence = (): number => this.defenceBehaviour.block()
    private moveBehaviour: MoveBehaviour
    private attackBehaviour: AttackBehaviour
    private defenceBehaviour: DefenceBehaviour

    public constructor(move: MoveBehaviour, attack: AttackBehaviour, defence: DefenceBehaviour) {
        this.attackBehaviour = attack
        this.moveBehaviour = move
        this.defenceBehaviour = defence
    }

    get stats() {
        return {
            health: this.health,
            movementSpeed: this.performMove(),
            attackDamage: this.performAttack(),
            blockPercentage: this.defenceBehaviour.blockPercentage,
            blockAmount: this.defenceBehaviour.blockAmount
        }
    }

    public setMoveBehaviour(move: MoveBehaviour) {
        this.moveBehaviour = move
    }

    public setAttackBehaviour(attack: AttackBehaviour) {
        this.attackBehaviour = attack
    }

    public setDefenceBehaviour(defence: DefenceBehaviour) {
        this.defenceBehaviour = defence
    }
}