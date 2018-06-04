import {Item} from './interfaces/Item';

export class Inventory {
    _items: Item[] = [];

    public takeOut(nameOfItem): Item {
        return this._items.find((iterator) => iterator.name === nameOfItem);
    }

    public add(item: Item) {
        this._items.push(item);
    }
}