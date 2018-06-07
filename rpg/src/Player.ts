import {Unit} from './Unit/Unit';
import {Inventory} from './Inventory';
import {Reward} from './interfaces/Reward';

export class Player extends Unit {
    _inventory: Inventory = new Inventory();

    public collectRewards(rewards: Reward) {
        rewards.forEach(item => this._inventory.add(item));
    }

    public get inventory() {
        return this._inventory;
    }
}