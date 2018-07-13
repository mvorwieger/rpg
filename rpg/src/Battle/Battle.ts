import {Player} from '../Unit/Player';
import {Npc} from '../Unit/npc/Npc';
import {Logger} from '../log/Logger';
import {IBattle} from './IBattle';

export class Battle implements IBattle{
    private playerInBattle: Player;
    private npcInBattle: Npc;
    private playerWon: Boolean;
    public battleLog: Logger;

    constructor(player: Player, npc: Npc) {
        this.playerInBattle = player;
        this.npcInBattle = npc;
        this.battleLog = new Logger();
    }

    public battle = () => {
        while (this.playerInBattle.health >= 0 && this.npcInBattle.health >= 0) {
            this.playRound();
            this.battleLog.log({player: this.playerInBattle.stats, npc: this.npcInBattle.stats});
        }

        this.playerWon = this.playerInBattle.health > 0;
    };

    private playRound = () => {
        this.playerInBattle.health = this.playerInBattle.health - (this.npcInBattle.performAttack() - this.playerInBattle.performDefence());
        this.npcInBattle.health = this.npcInBattle.health - (this.playerInBattle.performAttack() - this.npcInBattle.performDefence());
    };

    public get didPlayerWin() {
        return this.playerWon;
    }

    public get player() {
        return this.playerInBattle;
    }

    public get npc() {
        return this.npcInBattle;
    }
}