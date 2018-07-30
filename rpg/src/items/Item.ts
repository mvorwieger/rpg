import {Behaviour} from './Behaviours/Behaviour'

export class Item {
    constructor(
        public rarity: string,
        public value: number,
        public name: string,
        private _behaviour: Behaviour
    ) { }

    public get behaviour() {
        return this._behaviour.values
    }

    public get type() {
        return this._behaviour.type
    }
}