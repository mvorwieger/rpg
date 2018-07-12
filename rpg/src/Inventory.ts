import {Item} from './items/Item';

export class Inventory {
    private inventoryItems: Item[] = [];

    public searchItem(nameOfItem: string): Item {
        return this.inventoryItems.find((iterator) => iterator.name === nameOfItem);
    }

    public add(item: Item): void {
        this.inventoryItems.push(item);
    }

    public removeItem(item: Item): void {
        this.inventoryItems = this.inventoryItems.filter(itemIterator => itemIterator !== item);
    }

    public contains(item): boolean {
        return Boolean(this.inventoryItems.filter((currentItem: Item) => item.name === currentItem.name).length)
    }

    public get items(): Item[] {
        return this.inventoryItems;
    }
}