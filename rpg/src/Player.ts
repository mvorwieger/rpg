import {Unit} from './Unit/Unit';
import {Inventory} from './Inventory';
import {Reward} from './interfaces/Reward';]]
import {
    instanceOfAttackBehaviour, instanceOfDefenceBehaviour,
    instanceOfMoveBehaviour
} from './interfaces/Behaviours/BehaviourInstanceHelper'

export class Player extends Unit {
    _inventory: Inventory = new Inventory();

    public collectRewards(rewards: Reward) {
        rewards.forEach(item => this._inventory.add(item));
    }

    public get items() {
        return this._inventory.items;
    }

    public equipItem(itemName: String) {
        const item = this._inventory.searchItem(itemName);
        this._inventory.removeItem(item);

        this._behaviourSelector(item.behaviour);
    }

    private _behaviourSelector(behaviour) {
        if(instanceOfAttackBehaviour(behaviour)) this.setAttackBehaviour(behaviour);
        if(instanceOfDefenceBehaviour(behaviour)) this.setDefenceBehaviour(behaviour);
        if(instanceOfMoveBehaviour(behaviour)) this.setMoveBehaviour(behaviour);
    }
}