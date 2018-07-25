import {Player} from '../Unit/Player'
import {IPlayerModel, PlayerModel} from './models/PlayerModel'
import {Document} from "mongoose"
import {ItemService} from './services/ItemService'

export class PlayerRepository {
    constructor(private itemService: ItemService, public playerId?: any) { }

    public getPlayer(id?: string) {
        const usedId = Boolean(id) ? id : this.playerId
        return new Promise((resolve, reject) => {
            PlayerModel.findById(usedId)
                .then(doc => resolve(doc))
                .catch(err => reject(err))
        })
    }

    private convertPlayerToSchema = (player: Player): Promise<any> => {
        return new Promise((resolve, reject) => {
            // create Promises
            const PromiseEquippedWeaponItem = this.itemService.getIdOfItemInDatabase(player.equippedItemList.weapon)
            const PromiseEquippedMovementItem = this.itemService.getIdOfItemInDatabase(player.equippedItemList.foot)
            const PromiseEquippedDefenceItem = this.itemService.getIdOfItemInDatabase(player.equippedItemList.shield)
            const PromiseInventory = player.items.map(this.itemService.getIdOfItemInDatabase)

            Promise.all([PromiseEquippedWeaponItem, PromiseEquippedMovementItem, PromiseEquippedDefenceItem, ...PromiseInventory])
                .then((res: Document[]) => {
                    // Gather Results
                    const [equippedWeaponItemId, equippedMovementItemId, equippedDefenceItemId, ...inventoryItemIds] = res

                    resolve({
                        health: player.health,
                        inventoryItemIds,
                        equippedWeaponItemId,
                        equippedMovementItemId,
                        equippedDefenceItemId,
                        walletMoney: player.wallet.money
                    })
                }).catch((err) => reject('couldnt fetch item ids: ' + err))
        })
    }

    public updatePlayer(player: Player): any {
        return new Promise((resolve, reject) => {
            this.convertPlayerToSchema(player)
                .then(convertedPlayer => {
                    PlayerModel
                        .findById(this.playerId)
                        .update(convertedPlayer)
                        .then(doc => resolve(doc))
                        .catch(err => reject(err))
                })
                .catch(err => reject(err))
        })
    }

    public createPlayer = (player: Player): Promise<IPlayerModel> => PlayerModel.create(new PlayerModel(player))
}