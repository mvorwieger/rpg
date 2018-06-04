import {MoveBehaviour} from '../interfaces/MoveBehaviour';

export class Run implements MoveBehaviour {
    moveSpeed: number = 2;
    move = () => this.moveSpeed;
}