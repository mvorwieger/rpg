import {Item} from './items/Item'
import {IBattle} from './Battle/IBattle'

export class Level {
    public completed: boolean = false
    /**
     * gives u the Reward of the level if the player Won or an empty array if the player lost
     * @return {Item[]}
     */
    public claimPrize = (): Item[] => this.battle.didPlayerWin ? this.reward : []

    constructor(private readonly reward: Item[],
                private battle: IBattle) {
        this.battle = battle
        this.reward = reward
    }

    /**
     * Starts the Battle that was constructed with this level
     */
    public startLevel() {
        if (!this.completed) {
            this.battle.battle()
            this.completed = true
        } else throw Error("cannot start a level a Second time")
    }
}