import {MoveBehaviour} from '../interfaces/Behaviours/MoveBehaviour';

export class Walk implements MoveBehaviour {
    moveSpeed: number = 1;
    move = () => this.moveSpeed;
}