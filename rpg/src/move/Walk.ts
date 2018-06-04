import {MoveBehaviour} from '../interfaces/MoveBehaviour';

export class Walk implements MoveBehaviour {
    moveSpeed: number = 1;
    move = () => this.moveSpeed;
}