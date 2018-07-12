import {Unit} from './Unit';
import {Inventory} from '../Inventory';
import {
    instanceOfAttackBehaviour, instanceOfDefenceBehaviour,
    instanceOfMoveBehaviour
} from '../items/Behaviours/Behaviour'
import {Item} from '../items/Item';
import {MovementItem, DefenceItem, WeaponItem} from '../items/ItemTypes';


export class Player extends Unit {
    private _inventory: Inventory = new Inventory();
    private equippedItems: { weapon: WeaponItem, foot: MovementItem, shield: DefenceItem } = {
        weapon: undefined,
        foot: undefined,
        shield: undefined
    };

    constructor(weapon: WeaponItem, foot: MovementItem, shield: DefenceItem) {
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
        const item: Item = this._inventory.searchItem(itemName);
        this._inventory.removeItem(item);

        this.equipItem(item);
    }

    /**
     * Equips item by reference (you can get the reference if u call Player.items, and pass reference of the Item)
     * @param {Item} item
     */
    public equipItemByRef(item: Item) {
        if (this._inventory.contains(item)) {
            this._inventory.removeItem(item);
            this.equipItem(item)
        }
    }

    private setWeapon(item: WeaponItem) {
        if (!this.equippedItems.weapon) {
            this._inventory.add(this.equippedItems.weapon)
            this.equippedItems.weapon = item;
        }
    }

    private setShield(item: DefenceItem) {
        if (!this.equippedItems.shield) {
            this._inventory.add(this.equippedItems.shield)
            this.equippedItems.shield = item;
        }
    }

    private setFoot(item: MovementItem) {
        if (!this.equippedItems.foot) {
            this._inventory.add(this.equippedItems.foot)
            this.equippedItems.foot = item;
        }
    }

    private equipItem(item: Item) {
        if (instanceOfAttackBehaviour(item.behaviour)) {
            this.setWeapon(item as WeaponItem);
            this.setAttackBehaviour(item.behaviour);
        }

        if (instanceOfDefenceBehaviour(item.behaviour)) {
            this.setShield(item as DefenceItem);
            this.setDefenceBehaviour(item.behaviour);
        }

        if (instanceOfMoveBehaviour(item.behaviour)) {
            this.setFoot(item as MovementItem);
            this.setMoveBehaviour(item.behaviour);
        }
    }
}