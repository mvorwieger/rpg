import {Player} from './Player';
import {Npc} from './npc/Npc';
import {Logger} from './log/Logger';
import {Reward} from './interfaces/Reward';

export class Battle {
    private _player: Player;
    private _npc: Npc;
    private _didPlayerWin: Boolean;
    public battleLog: Logger;

    constructor(player: Player, npc: Npc) {
        this._player = player;
        this._npc = npc;
        this.battleLog = new Logger();
    }

    public battle = () => {
        while (this._player.health >= 0 && this._npc.health >= 0) {
            this.playRound();
            this.battleLog.log({player: this._player.stats, npc: this._npc.stats});
        }

        this._didPlayerWin = this._player.health > 0;
    }

    private playRound = () => {
        this._player.health = this._player.health - (this._npc.performAttack() - this.player.performDefence());
        this._npc.health = this._npc.health - (this._player.performAttack() - this.npc.performDefence());
    }

    public get didPlayerWin() {
        return this._didPlayerWin;
    }

    public get player() {
        return this._player;
    }

    public get npc() {
        return this._npc;
    }
}