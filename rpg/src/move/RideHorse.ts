import {MoveBehaviour} from '../interfaces/MoveBehaviour';

export class RideHorse implements MoveBehaviour {
    moveSpeed: number = 3;
    move = () => this.moveSpeed;
}