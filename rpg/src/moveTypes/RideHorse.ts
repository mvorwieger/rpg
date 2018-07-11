import {MoveBehaviour} from '../interfaces/Behaviours/MoveBehaviour';

export class RideHorse implements MoveBehaviour {
    moveSpeed: number = 3;
    move = () => this.moveSpeed;
}