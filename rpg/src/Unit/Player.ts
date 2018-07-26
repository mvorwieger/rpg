import {Unit} from './Unit';
import {Inventory} from '../Inventory';
import {
    instanceOfAttackBehaviour, instanceOfDefenceBehaviour,
    instanceOfMoveBehaviour
} from '../items/Behaviours/Behaviour'
import {Item} from '../items/Item';
import {MovementItem, DefenceItem, WeaponItem} from '../items/ItemTypes';
import {Wallet} from "../Wallet";


export class Player extends Unit {
    private equippedItems: { weapon: WeaponItem, foot: MovementItem, shield: DefenceItem } = {
        weapon: undefined,
        foot: undefined,
        shield: undefined
    };
    constructor(weapon: WeaponItem, foot: MovementItem, shield: DefenceItem, public inventory: Inventory, public wallet: Wallet) {
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
        items.forEach(item => this.inventory.add(item));
    }

    /**
     *
     * @returns {{weapon: WeaponItem; foot: MovementItem; shield: DefenceItem}}
     */
    public get equippedItemList() {
        return this.equippedItems
    }

    /**
     * returns Readonly version of the players current inventory
     * @returns {Item[]}
     * @readonly
     */
    public get items(): Item[] {
        return this.inventory.items;
    }

    /**
     * Equips item by name if its in the players inventory
     * @param {string} itemName
     */
    public equipItemByName(itemName: string) {
        const item: Item = this.inventory.searchItem(itemName);
        this.inventory.removeItem(item);

        this.equipItem(item);
    }

    /**
     * Equips item by reference (you can get the reference if u call Player.items, and pass reference of the Item)
     * @param {Item} item
     */
    public equipItemByRef(item: Item) {
        if (this.inventory.contains(item)) {
            this.inventory.removeItem(item);
            this.equipItem(item)
        }
    }

    private setWeapon(item: WeaponItem) {
        if (!this.equippedItems.weapon) {
            this.inventory.add(this.equippedItems.weapon);
            this.equippedItems.weapon = item;
        }
    }

    private setShield(item: DefenceItem) {
        if (!this.equippedItems.shield) {
            this.inventory.add(this.equippedItems.shield);
            this.equippedItems.shield = item;
        }
    }

    private setFoot(item: MovementItem) {
        if (!this.equippedItems.foot) {
            this.inventory.add(this.equippedItems.foot);
            this.equippedItems.foot = item;
        }
    }

    /**
     * Is used to dynamically set a Item based on their behaviour type
     * @param {Item} item
     */
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

    /**
     * Exchange is used to perform transactions between 2 parties of Transactors
     * @param {number} amount | Wallet the item is exchanged for
     * @param {Item} item | Item the money is exchanged for
     * @param {Wallet} exchangeWallet | Wallet of the opposing Party
     * @return {any}
     */
    public exchange(amount: number, item: Item, exchangeWallet: Wallet): Item | boolean {
        if(this.wallet.sub(amount)) {
            this.moveItemsToInventory([item]);
            exchangeWallet.add(amount);
            return item;
        }
        return false;
    }
}