import {Item} from './items/Item';
import {IBattle} from './Battle/IBattle';

export class Level {
    constructor(private readonly reward: Item[],
                private battle: IBattle) {
       this.battle = battle;
       this.reward = reward;
    }

    /**
     * Starts the Battle that was constructed with this level
     */
    public startLevel() {
        this.battle.battle();
    }

    /**
     * gives u the Reward of the level if the player Won or an empty array if the player lost
     * @return {Item[]}
     */
    public claimPrize = (): Item[] => this.battle.didPlayerWin ? this.reward : [];
}