import {Player} from '../Unit/Player';
import {Npc} from '../Unit/npc/Npc';

export interface IBattle {
    didPlayerWin: Boolean
    battle: () => void
    player: Player
}