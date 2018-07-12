import {Battle} from './Battle/Battle';
import {Item} from './items/Item';

export class Level {
    private readonly reward: Item[];
    private battle: Battle;

    constructor(reward: Item[],
                battle: Battle) {
       this.battle = battle;
       this.reward = reward;
    }

    public startLevel() {
        this.battle.battle();
    }

    public claimPrize = (): Item[] => this.battle.didPlayerWin ? this.reward : [];
}