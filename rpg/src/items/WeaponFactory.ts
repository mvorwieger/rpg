import {Item} from '../Item';
import {Axe} from '../attackTypes/Axe';
import {Sword} from '../attackTypes/Sword';
import {Rarity} from './defaults/Raritys';
import {WeaponBaseValues} from './defaults/WeaponBaseValues';
import {WeaponItem} from './ItemTypes';

/**
 * WeaponFactory is used to create instances of WeaponItems
 */
export class WeaponFactory {
    public static createFireAxeItem = (): WeaponItem =>  new Item(Rarity.rare, 4000, 'Fire Axe', new Axe(20));
    public static createBasicSwordItem = (): WeaponItem => new Item(Rarity.common, 10, 'Basic Sword', new Sword(WeaponBaseValues.sword));
}
