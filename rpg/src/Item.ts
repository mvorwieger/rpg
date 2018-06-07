export class Item {
    rarity: String;
    value: number;
    name: String;
    behaviour: any;

    constructor(rarity: String, value: number, name: String, behaviour: any = null) {
        this.rarity = rarity;
        this.value = value;
        this.name = name;
        this.behaviour = behaviour;
    }
}