import {Player} from '../Unit/Player'
import {IPlayerModel, PlayerModel} from './models/PlayerModel'
import {Document} from "mongoose"
import {ItemService} from './services/ItemService'

export class PlayerRepository {
    constructor(private itemService: ItemService, public playerId?: any) { }

    /**
     * used to find a player By Id
     * @param {string} id
     * @returns {Promise<any>}
     */
    public find(id?: string): Promise<IPlayerModel> {
        const usedId = Boolean(id) ? id : this.playerId
        return new Promise((resolve, reject) => {
            PlayerModel.findById(usedId)
                .then(doc => resolve(doc))
                .catch(err => reject(err))
        })
    }

    /**
     * Replaces the Player Object at the current position of the Database with the new one
     * You can either pass the playerId or it will take the one created with the playerRepo
     * @param {Player} player
     * @param playerId
     * @returns {number} Updated Rows
     */
    public replace(player: Player, playerId?): Promise<number> {
        const id = playerId ? playerId : this.playerId
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

    /**
     * adds a new Player entry at the Player Database and also returns the Created Document So you could for
     * example extract the player._id and add it somewhere
     * @param {Player} player
     * @returns {Promise<IPlayerModel>}
     */
    public add = (player: Player): Promise<IPlayerModel> => PlayerModel.create(new PlayerModel(this.convertPlayerToSchema(player)))

    /**
     * Used to convert the Player Class to the schema used in the Database
     * @param {Player} player
     * @returns {Promise<{}>}
     */
    private convertPlayerToSchema = (player: Player): Promise<any> => {
        return new Promise((resolve, reject) => {
            // create Promises
            const PromiseEquippedWeaponItem = this.itemService.findId(player.equippedItemList.weapon)
            const PromiseEquippedMovementItem = this.itemService.findId(player.equippedItemList.foot)
            const PromiseEquippedDefenceItem = this.itemService.findId(player.equippedItemList.shield)
            const PromiseInventory = player.items.map(this.itemService.findId)

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
}