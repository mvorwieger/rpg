import {MoveBehaviour} from '../interfaces/Behaviours/MoveBehaviour';

export class Run implements MoveBehaviour {
    moveSpeed: number = 2;
    move = () => this.moveSpeed;
}