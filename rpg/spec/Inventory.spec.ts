import "jasmine";
import {Inventory} from '../src/Inventory';
import {mockItems} from './mocks/itemMock';

describe("Inventory::", () => {
    let inventory: Inventory;

    beforeEach(() => {
        inventory = new Inventory();
    });

    it('add() should add items to the items array', function () {
        const item = mockItems[0]
        inventory.add(item);

        expect(inventory.items).toContain(item);
    });

    it('removeItem() should remove item given as Input', function () {
        inventory.add(mockItems[0]);
        inventory.add(mockItems[1]);
        inventory.removeItem(mockItems[0]);

        expect(inventory.items).not.toContain(mockItems[0]);
        expect(inventory.items).toContain(mockItems[1]);
    });

    it('searchItem() should find items by name', function () {
        inventory.add(mockItems[0]);
        inventory.add(mockItems[1]);

        expect(inventory.searchItem(mockItems[0].name)).toBe(mockItems[0]);
        expect(inventory.searchItem(mockItems[0].name)).not.toBe(mockItems[1]);
    });

    it('GET items() should return getter for all items', function () {
        inventory.add(mockItems[0]);
        expect(inventory.items).toContain(mockItems[0]);
    });

    it('contains() should return true if the array contains the item', function () {
        inventory.add(mockItems[0]);
        expect(inventory.contains(mockItems[0])).toBeTruthy();
        expect(inventory.contains(mockItems[1])).toBeFalsy();
    });
});