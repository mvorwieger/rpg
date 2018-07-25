import {WeaponFactory} from '../items/WeaponFactory'
import {MovementFactory} from '../items/MovementFactory'
import {ShieldFactory} from '../items/ShieldFactory'
import {Player} from './Player'

export class PlayerFactory {
    public static createBasicPlayer = () => new Player(
        WeaponFactory.createBasicSwordItem(),
        MovementFactory.createBareFeetItem(),
        ShieldFactory.createNoShieldItem()
    )
}