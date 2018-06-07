import {Item} from '../../Item';
import {Axe} from '../../attack/Axe';
import {Rarity} from '../defaults/Raritys';

export const FireAxe = new Item(Rarity.rare, 4000, 'Fire Axe', new Axe(20));