import {MoveBehaviour} from '../interfaces/MoveBehaviour';
import {AttackBehaviour} from '../interfaces/AttackBehaviour';

export class Unit {
    private _moveBehaviour: MoveBehaviour;
    private _attackBehaviour: AttackBehaviour;
    private _health: number = 100;

    public constructor(move: MoveBehaviour, attack: AttackBehaviour) {
        this._attackBehaviour = attack;
        this._moveBehaviour = move;
    }

    public performMove = (): number => this._moveBehaviour.move();

    public performAttack = (): number => this._attackBehaviour.attack();

    public setMoveBehaviour(move: MoveBehaviour) {
        this._moveBehaviour = move;
    }

    public setAttackBehaviour(attack: AttackBehaviour) {
        this._attackBehaviour = attack;
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
            attackDamage: this.performAttack()
        }
    }
}