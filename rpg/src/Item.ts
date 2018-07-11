export class Item {
    rarity: string;
    value: number;
    name: string;
    behaviour: any;

    constructor(rarity: string, value: number, name: string, behaviour: any = null) {
        this.rarity = rarity;
        this.value = value;
        this.name = name;
        this.behaviour = behaviour;
    }
}