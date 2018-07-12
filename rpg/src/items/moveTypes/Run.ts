import {MoveBehaviour} from '../Behaviours/MoveBehaviour';

export class Run implements MoveBehaviour {
    moveSpeed: number = 2;
    move = () => this.moveSpeed;
}