import {MoveBehaviour} from '../interfaces/MoveBehaviour';
import {AttackBehaviour} from '../interfaces/AttackBehaviour';
import {DefenceBehaviour} from '../interfaces/DefenceBehaviour';
import {NoDefence} from '../defence/NoDefence';
import {NoAttack} from '../attack/NoAttack';

export class Unit {
    private _moveBehaviour: MoveBehaviour;
    private _attackBehaviour: AttackBehaviour;
    private _defenceBehaviour: DefenceBehaviour;
    private _health: number = 100;

    public constructor(move: MoveBehaviour, attack: AttackBehaviour = new NoAttack(), defence: DefenceBehaviour = new NoDefence()) {
        this._attackBehaviour = attack;
        this._moveBehaviour = move;
        this._defenceBehaviour = defence;
    }

    public performMove = (): number => this._moveBehaviour.move();

    public performAttack = (): number => this._attackBehaviour.attack();

    public performDefence = (): number => this._defenceBehaviour.block();

    public setMoveBehaviour(move: MoveBehaviour) {
        this._moveBehaviour = move;
    }

    public setAttackBehaviour(attack: AttackBehaviour) {
        this._attackBehaviour = attack;
    }

    public setDefenceBehaviour(defence: DefenceBehaviour) {
        this._defenceBehaviour = defence;
    }

    get health() {
        return this._health;
    }

    set health(value: number) {
        this._health = value;
    }

    get stats() {
        return {
            health: this._health,
            movementSpeed: this.performMove(),
            attackDamage: this.performAttack(),
            blockPercentage: this._defenceBehaviour.blockPercentage,
            blockAmount: this._defenceBehaviour.blockAmount
        }
    }
}