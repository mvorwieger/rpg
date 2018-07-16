import {Player} from '../Unit/Player';
import {Npc} from '../Unit/npc/Npc';
import {Logger} from '../log/Logger';
import {IBattle} from './IBattle';

/**
 * Find a Fix for that so we dont need ot use module.exports and can just use export
 * @type {{new(player: Player, npcs: Npc[]): GroupBattle; didPlayerWin: Boolean; battle: () => void; player: Player}}
 */
module.exports = class GroupBattle implements IBattle {
    private playerInBattle: Player;
    private npcs: Npc[];
    private playerWon: Boolean;
    public battleLog: Logger;

    constructor(player: Player, npcs: Npc[]) {
        this.playerInBattle = player;
        this.npcs = npcs;
        this.battleLog = new Logger();
    }

    /**
     * Performs the Battle until one Party is dead (in this Case either the player or all of the npcs)
     */
    public battle = ():void => {
        while (!this.areNpcsDead() && this.playerInBattle.health >= 0) {
            this.npcs.forEach(npc => {
                const {player, enemy} = this.playRound(this.playerInBattle, npc)
                this.playerInBattle = player;
                npc = enemy
            });

            this.battleLog.log({player: this.playerInBattle.stats, enemy: this.npcs.map(data => data.stats)})
        }

        this.playerWon = this.playerInBattle.health >= 0;
    };

    /**
     * Can be used after Battle to see if the player Won
     * @return {Boolean}
     */
    public get didPlayerWin(): Boolean {
        return this.playerWon;
    }

    /**
     * gives you the player instance in this Battle
     * @return {Player}
     */
    public get player() {
        return this.playerInBattle;
    }

    private playRound = (player: Player, enemy: Npc): {player: Player, enemy: Npc} => {
        player.health = player.health - (enemy.performAttack() - player.performDefence());
        enemy.health = enemy.health - (player.performAttack() - enemy.performDefence());

        return {
            player,
            enemy
        };
    };

    private areNpcsDead(): Boolean {
        return this.npcs.reduce((a, b) => b.health <= 0, false)
    }
}