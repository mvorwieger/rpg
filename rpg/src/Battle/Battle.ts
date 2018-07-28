import {Player} from '../Unit/Player'
import {Npc} from '../Unit/npc/Npc'
import {Logger} from '../log/Logger'
import {IBattle} from './IBattle'

export class Battle implements IBattle {
    private playerInBattle: Player
    private npcInBattle: Npc
    private playerWon: Boolean
    public battleLog: Logger

    constructor(player: Player, opponent: Npc | Player) {
        this.playerInBattle = player
        this.npcInBattle = opponent
        this.battleLog = new Logger()
    }

    public battle = () => {
        let roundCounter = 0
        while (this.isEveryOneAlive()) {
            this.playRound()
            roundCounter++
            this.battleLog.log({round: roundCounter, player: this.playerInBattle.stats, npc: this.npcInBattle.stats, bothAlive: this.isEveryOneAlive()})
        }

        this.playerWon = this.playerInBattle.health > 0
    }

    private playRound = () => {
        this.playerInBattle.health = this.playerInBattle.health - (this.npcInBattle.performAttack()  - this.playerInBattle.performDefence())
        this.npcInBattle.health = this.npcInBattle.health - (this.playerInBattle.performAttack() - this.npcInBattle.performDefence())
    }

    public isEveryOneAlive() {
        return this.playerInBattle.health > 0 && this.npcInBattle.health > 0
    }

    public get didPlayerWin() {
        return this.playerWon
    }

    public get player() {
        return this.playerInBattle
    }

    public get npc() {
        return this.npcInBattle
    }
}