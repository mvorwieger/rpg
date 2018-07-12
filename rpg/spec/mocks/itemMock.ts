import {Item} from '../../src/items/Item';
import {NoAttack} from '../../src/items/attackTypes/NoAttack';
import {NoDefence} from '../../src/items/defenceTypes/NoDefence';

export const mockItems: Item[] = [
    new Item(
        "someRarity",
        123,
        "someName",
        new NoAttack(0)
    ),
    new Item(
        "someRarity1",
        344,
        "someName2",
        new NoDefence()
    )
]