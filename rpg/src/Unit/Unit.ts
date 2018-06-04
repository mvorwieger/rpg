import {MoveBehaviour} from '../interfaces/MoveBehaviour';
import {AttackBehaviour} from '../interfaces/AttackBehaviour';

export class Unit {
    private moveBehaviour: MoveBehaviour;
    private attackBehaviour: AttackBehaviour;
    private health: number = 100;

    public constructor(move: MoveBehaviour, attack: AttackBehaviour) {
        this.attackBehaviour = attack;
        this.moveBehaviour = move;
    }

    public performMove = (): number => this.moveBehaviour.move();

    public performAttack = (): number => this.attackBehaviour.attack();

    public setMoveBehaviour(move: MoveBehaviour) {
        this.moveBehaviour = move;
    }

    public setAttackBehaviour(attack: AttackBehaviour) {
        this.attackBehaviour = attack;
    }

    get health() {
        return this.health;
    }

    set health(value: number) {
        this.health = value;
    }
}