import {Item} from './items/Item';

export class Inventory {
    private  items: Item[] = [];

    public searchItem(nameOfItem: string): Item {
        return this. items.find((iterator) => iterator.name === nameOfItem);
    }

    public add(item: Item): void {
        this. items.push(item);
    }

    public removeItem(item: Item): void {
        this. items = this. items.filter(itemIterator => itemIterator !== item);
    }

    public contains(item): boolean {
        return Boolean(this. items.filter((currentItem: Item) => item.name === currentItem.name).length)
    }

    public get items(): Item[] {
        return this. items;
    }
}