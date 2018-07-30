import {Player} from '../Unit/Player'

export interface IBattle {
    didPlayerWin: Boolean
    battle: () => void
    player: Player
}