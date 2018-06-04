import {Player} from './Player';
import {Npc} from './npc/Npc';

export class Battle {
    private player: Player;
    private npc: Npc;
    private didPlayerWin: Boolean;

    constructor(player: Player, npc: Npc) {
        this.player = player;
        this.npc = npc;
    }

    public battle = () => {
        while (this.player.health >= 0 && this.npc.health >= 0) {
            this.x();
        }

        this.didPlayerWin = this.player.health > 0
    }

    private x = () => {
        this.player.health = this.player.health - this.npc.performAttack();
        this.npc.health = this.npc.health - this.player.performAttack();
    }


    public result = (): Boolean => {
        return this.didPlayerWin;
    }
}