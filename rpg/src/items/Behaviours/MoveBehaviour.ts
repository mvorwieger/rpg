import {Behaviour} from './Behaviour'

export class MoveBehaviour implements Behaviour{
    constructor(public moveSpeed: number) {}
    public move = () => this.moveSpeed
}
