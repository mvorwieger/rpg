import {Item} from '../Item';
import {Rarity} from './defaults/Raritys';
import {Shield} from '../defenceTypes/Shield';
import {ShieldBaseValues} from './defaults/ShieldBaseValues';
import {NoDefence} from '../defenceTypes/NoDefence';
import {ShieldItem} from './ItemTypes';

/**
 * ShieldFactory is used to create instances of ShieldItems
 */
export class ShieldFactory {
    public static createBaseShieldItem = (): ShieldItem => new Item(
        Rarity.common,
        10,
        "Base ShieldItem",
        new Shield(ShieldBaseValues.wooden.blockPercentage, ShieldBaseValues.wooden.blockAmount)
    ) as ShieldItem;

    public static createNoShieldItem = (): ShieldItem => new Item(
        Rarity.none,
        10,
        "No Shield",
        new NoDefence()
    ) as ShieldItem;
}
