import {Battle} from './src/Battle';
import {Reward} from './src/interfaces/Reward';

export class Level {
    private reward: Reward;
    private battle: Battle;

    constructor(reward: Reward,
                battle: Battle) {
       this.battle = battle;
       this.reward = reward;
    }

    public startLevel() {
        this.battle.battle();
    }

    public claimPrize = () => this.battle.didPlayerWin ? this.reward : [];

}