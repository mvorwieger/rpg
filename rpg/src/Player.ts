import {Unit} from './Unit/Unit';
import {Inventory} from './Inventory';
import {
    instanceOfAttackBehaviour, instanceOfDefenceBehaviour,
    instanceOfMoveBehaviour
} from './interfaces/Behaviours/BehaviourInstanceHelper'
import {Item} from './Item';
import {FootItem, ShieldItem, WeaponItem} from './items/ItemTypes';


export class Player extends Unit {
    private _inventory: Inventory = new Inventory();
    private equippedItems: { weapon: WeaponItem, foot: FootItem, shield: ShieldItem } = {
        weapon: undefined,
        foot: undefined,
        shield: undefined
    };

    constructor(weapon: WeaponItem, foot: FootItem, shield: ShieldItem) {
        /**
         * Super Call with the item Behaviours
         */
        super(foot.behaviour, weapon.behaviour, shield.behaviour);
        this.equippedItems.weapon = weapon;
        this.equippedItems.foot = foot;
        this.equippedItems.shield = shield;
    }

    /**
     * Moves the given items to the Players Inventory
     * @param {Item[]} items
     */
    public moveItemsToInventory(items: Item[]) {
        items.forEach(item => this._inventory.add(item));
    }

    /**
     * returns Readonly version of the players current inventory
     * @returns {Item[]}
     * @readonly
     */
    public get items(): Item[] {
        return this._inventory.items;
    }

    /**
     * Equips item by name if its in the players inventory
     * @param {string} itemName
     */
    public equipItemByName(itemName: string) {
        const item = this._inventory.searchItem(itemName);
        this._inventory.removeItem(item);

        this.selectBehaviour(item.behaviour);
    }

    /**
     * Equips item by reference (you can get the reference if u call Player.items, and pass reference of the Item)
     * @param {Item} item
     */
    public equipItemByRef(item: Item) {
        this._inventory.removeItem(item);
        this.selectBehaviour(item)
    }

    private setWeapon(item: WeaponItem) {
        if (!this.equippedItems.weapon) {
            this._inventory.add(this.equippedItems.weapon)
            this.equippedItems.weapon = item;
        }
    }

    private setShield(item: ShieldItem) {
        if (!this.equippedItems.shield) {
            this._inventory.add(this.equippedItems.shield)
            this.equippedItems.shield = item;
        }
    }

    private setFoot(item: FootItem) {
        if (!this.equippedItems.foot) {
            this._inventory.add(this.equippedItems.foot)
            this.equippedItems.foot = item;
        }
    }

    private selectBehaviour(item: Item) {
        if (instanceOfAttackBehaviour(item.behaviour)) {
            this.setWeapon(item as WeaponItem);
            this.setAttackBehaviour(item.behaviour);
        }

        if (instanceOfDefenceBehaviour(item.behaviour)) {
            this.setShield(item as ShieldItem);
            this.setDefenceBehaviour(item.behaviour);
        }

        if (instanceOfMoveBehaviour(item.behaviour)) {
            this.setFoot(item as FootItem);
            this.setMoveBehaviour(item.behaviour);
        }
    }
}