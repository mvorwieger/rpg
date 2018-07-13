import {Item} from './items/Item';

export class Inventory {
    private inventoryItems: Item[] = [];

    /**
     * Searched Items in the Inventory Array by name<string>
     * @param {string} nameOfItem
     * @return {Item}
     */
    public searchItem(nameOfItem: string): Item {
        return this.inventoryItems.find((iterator: Item) => iterator.name === nameOfItem);
    }

    /**
     * Adds an Item to the Inventory without any checks
     * @param {Item} item
     */
    public add(item: Item): void {
        this.inventoryItems.push(item);
    }

    /**
     * Removes an item of the inventory without any checks
     * @param {Item} item
     */
    public removeItem(item: Item): void {
        this.inventoryItems = this.inventoryItems.filter((itemIterator: Item) => itemIterator !== item);
    }

    /**
     * Is used to check if an item exists in this inventory
     * @param item
     * @return {boolean}
     */
    public contains(item): boolean {
        return Boolean(this.inventoryItems.filter((currentItem: Item) => item.name === currentItem.name).length)
    }

    /**
     * gives you readonly instance of the Inventory
     * @return {Item[]}
     */
    public get items(): Item[] {
        return this.inventoryItems;
    }
}