import {Player} from '../Unit/Player';
import {Npc} from '../Unit/npc/Npc';
import {Logger} from '../log/Logger';

export class GroupBattle {
    private playerInBattle: Player;
    private npcs: Npc[];
    private playerWon: Boolean;
    public battleLog: Logger;

    constructor(player: Player, npcs: Npc[]) {
        this.playerInBattle = player;
        this.npcs = npcs;
        this.battleLog = new Logger();
    }

    public battle = () => {
        while (!this.areNpcsDead() && this.playerInBattle.health >= 0) {
            this.npcs = this.npcs.map(this.playRound);
            this.battleLog.log({player: this.playerInBattle.stats, enemy: this.npcs.map(data => data.stats)})
        }

        this.playerWon = this.playerInBattle.health >= 0;
    };

    private playRound = (enemy: Npc) => {
        this.playerInBattle.health = this.playerInBattle.health - (enemy.performAttack() - this.playerInBattle.performDefence());
        enemy.health = enemy.health - (this.playerInBattle.performAttack() - enemy.performDefence());

        return enemy;
    };

    private areNpcsDead(): Boolean {
        return this.npcs.reduce((a, b) => b.health <= 0, false)
    }

    public get didPlayerWin() {
        return this.playerWon;
    }

    public get player() {
        return this.playerInBattle;
    }
}