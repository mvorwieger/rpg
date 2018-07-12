import {Item} from '../../src/Item';
import {NoAttack} from '../../src/attackTypes/NoAttack';
import {NoDefence} from '../../src/defenceTypes/NoDefence';

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