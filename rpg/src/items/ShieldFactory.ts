import {Item} from '../Item';
import {Rarity} from './defaults/Raritys';
import {Shield} from '../defenceTypes/Shield';
import {ShieldBaseValues} from './defaults/ShieldBaseValues';
import {NoDefence} from '../defenceTypes/NoDefence';
import {DefenceItem} from './ItemTypes';

/**
 * ShieldFactory is used to create instances of ShieldItems
 */
export class ShieldFactory {
    public static createBaseShieldItem = (): DefenceItem => new Item(
        Rarity.common,
        10,
        "Base DefenceItem",
        new Shield(ShieldBaseValues.wooden.blockPercentage, ShieldBaseValues.wooden.blockAmount)
    ) as DefenceItem;

    public static createNoShieldItem = (): DefenceItem => new Item(
        Rarity.none,
        10,
        "No Shield",
        new NoDefence()
    ) as DefenceItem;
}
