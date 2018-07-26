import {Behaviour} from './Behaviours/Behaviour'

export class Item {
    constructor(
        public rarity: string,
        public value: number,
        public name: string,
        public behaviour: Behaviour
    ) { }
}