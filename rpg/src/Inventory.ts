import {Item} from './Item';

export class Inventory {
    private _items: Item[] = [];

    public searchItem(nameOfItem: string): Item {
        return this._items.find((iterator) => iterator.name === nameOfItem);
    }

    public add(item: Item): void {
        this._items.push(item);
    }

    public removeItem(item: Item): void {
        this._items = this._items.filter(itemIterator => itemIterator !== item);
    }

    get items(): Item[] {
        return this._items;
    }
}