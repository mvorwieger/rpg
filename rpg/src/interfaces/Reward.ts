import {Item} from '../Item';

export interface Reward {
    [index: number]: Item;

    forEach: Function;
}