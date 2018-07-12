import {MoveBehaviour} from '../items/Behaviours/MoveBehaviour';
import {AttackBehaviour} from '../items/Behaviours/AttackBehaviour';
import {DefenceBehaviour} from '../items/Behaviours/DefenceBehaviour';
import {NoDefence} from '../items/defenceTypes/NoDefence';
import {NoAttack} from '../items/attackTypes/NoAttack';

export class Unit {
    private moveBehaviour: MoveBehaviour;
    private attackBehaviour: AttackBehaviour;
    private defenceBehaviour: DefenceBehaviour;
    public health: number = 100;

    public constructor(move: MoveBehaviour, attack: AttackBehaviour, defence: DefenceBehaviour) {
        this.attackBehaviour = attack;
        this.moveBehaviour = move;
        this.defenceBehaviour = defence;
    }

    public performMove = (): number => this.moveBehaviour.move();

    public performAttack = (): number => this.attackBehaviour.attack();

    public performDefence = (): number => this.defenceBehaviour.block();

    public setMoveBehaviour(move: MoveBehaviour) {
        this.moveBehaviour = move;
    }

    public setAttackBehaviour(attack: AttackBehaviour) {
        this.attackBehaviour = attack;
    }

    public setDefenceBehaviour(defence: DefenceBehaviour) {
        this.defenceBehaviour = defence;
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
}