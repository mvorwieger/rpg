import {Item} from '../Item';
import {Rarity} from './defaults/Raritys';
import {Run} from '../moveTypes/Run';
import {Walk} from '../moveTypes/Walk';
import {RideHorse} from '../moveTypes/RideHorse';
import {FootItem} from './ItemTypes';

/**
 * FootFactory is used to create Instances of FootItems
 */
export class FootFactory {
    public static createBareFeetItem = (): FootItem => new Item(
        Rarity.none,
        0,
        "Bare Feet",
        new Run()
    );

    public static createDamagedBareFeetItem = (): FootItem => new Item(
        Rarity.none,
        0,
        "Bare Feet",
        new Walk()
    );

    public static createBaseHorseItem = (): FootItem => new Item(
        Rarity.common,
        10,
        "Base Horse",
        new RideHorse()
    );
}

