import {Player} from '../../Unit/Player'
import {Inject} from 'typescript-ioc'
import {ItemRepository} from '../ItemRepository'
import {Inventory} from '../../Inventory'
import {Wallet} from '../../Wallet'
import {PlayerFactory, Race} from '../../Unit/PlayerFactorie'
import {Battle} from '../../Battle/Battle'
import {IPlayerModel} from '../models/PlayerModel'
import {WeaponItem} from '../../items/types/WeaponItem'
import {MovementItem} from '../../items/types/MovementItem'
import {DefenceItem} from '../../items/types/DefenceItem'

export class PlayerService {
    public playerModelToPlayer = (playerModel: any): Player => new Player(
        this.itemService.itemModelToItem(playerModel.weapon) as WeaponItem,
        this.itemService.itemModelToItem(playerModel.movement) as MovementItem,
        this.itemService.itemModelToItem(playerModel.defence) as DefenceItem,
        new Inventory(playerModel.inventory.map(this.itemService.itemModelToItem)),
        new Wallet(playerModel.money)
    )
    public battle = async (playerModel: IPlayerModel, opponent: IPlayerModel) => {
        const player = this.playerModelToPlayer(playerModel)
        const opponentPlayer = this.playerModelToPlayer(opponent)

        const battle = new Battle(player, opponentPlayer)
        battle.battle()

        return {
            win: battle.didPlayerWin,
            logs: battle.battleLog.logs
        }
    }
    public chooseRace = (race: Race): Player => this.playerFactory.chooseRace(race)

    constructor(@Inject private itemService: ItemRepository, @Inject private playerFactory: PlayerFactory) {
    }
}