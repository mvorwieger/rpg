import {Item} from './Item';
import {Rarity} from './ItemDefaults/Raritys';
import {Run} from './moveTypes/Run';
import {Walk} from './moveTypes/Walk';
import {RideHorse} from './moveTypes/RideHorse';
import {MovementItem} from './ItemTypes';

/**
 * MovementFactory is used to create Instances of FootItems
 */
export class MovementFactory {
    public static createBareFeetItem = (): MovementItem => new Item(
        Rarity.none,
        0,
        "Bare Feet",
        new Run()
    ) as MovementItem;

    public static createDamagedBareFeetItem = (): MovementItem => new Item(
        Rarity.none,
        0,
        "Bare Feet",
        new Walk()
    ) as MovementItem;

    public static createBaseHorseItem = (): MovementItem => new Item(
        Rarity.common,
        10,
        "Base Horse",
        new RideHorse()
    ) as MovementItem;
}

