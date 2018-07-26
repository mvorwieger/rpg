import {Player} from '../../Unit/Player'
import {Inject} from 'typescript-ioc'
import {ItemService} from './ItemService'
import {Inventory} from '../../Inventory'
import {Wallet} from '../../Wallet'
import {DefenceItem, MovementItem, WeaponItem} from '../../items/ItemTypes'
import {PlayerFactory, Race} from '../../Unit/PlayerFactorie'

export class PlayerService {
    constructor(@Inject private itemService: ItemService, @Inject private playerFactory: PlayerFactory) {
    }

    public playerModelToPlayer = (playerModel: any): Player => new Player(
        this.itemService.itemModelToItem(playerModel.weapon) as WeaponItem,
        this.itemService.itemModelToItem(playerModel.movement) as MovementItem,
        this.itemService.itemModelToItem(playerModel.defence) as DefenceItem,
        new Inventory(playerModel.inventory.map(this.itemService.itemModelToItem)),
        new Wallet(playerModel.money)
    )

    public chooseRace = (race: Race): Player =>  this.playerFactory.chooseRace(race)
}