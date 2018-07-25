import {Player} from '../Unit/Player'
import {IPlayerModel, PlayerModel} from './models/PlayerModel'
import {Document, default as mongoose} from "mongoose"
import {ItemService} from './services/ItemService'
import {Inject} from 'typescript-ioc'

export class PlayerRepository {
    public playerId: string

    constructor(@Inject private itemService: ItemService) { }
    /**
     * used to find a player By Id
     * @param {string} id
     * @returns {Promise<any>}
     */
    public find  = (id?: string): Promise<IPlayerModel> =>{
        const usedId = Boolean(id) ? id : this.playerId
        return PlayerModel.findById(usedId)
            .populate('equippedWeaponItemId')
            .populate('equippedDefenceItemId')
            .populate('equippedMovementItemId')
            .populate('inventoryItemIds')
            .exec()
    }

    /**
     * Replaces the Player Object at the current position of the Database with the new one
     * You can either pass the playerId or it will take the one created with the playerRepo
     * @param {Player} player
     * @param playerId
     * @returns {number} Updated Rows
     */
    public replace= async (player: Player, playerId?): Promise<number> => {
        const id = playerId ? playerId : this.playerId
        const convertedPlayer  = this.convertPlayerToSchema(player)
        return PlayerModel
            .findById(this.playerId)
            .update(convertedPlayer)
    }

    /**
     * adds a new Player entry at the Player Database and also returns the Created Document So you could for
     * example extract the player._id and add it somewhere
     * @param {Player} player
     * @returns {Promise<IPlayerModel>}
     */
    public add = async (player: Player): Promise<any> => {
        const convertedPlayer = await this.convertPlayerToSchema(player)
        return PlayerModel.create(convertedPlayer)
    }

    /**
     * Used to convert the Player Class to the schema used in the Database
     * @param {Player} player
     * @returns {Promise<{}>}
     */
    public convertPlayerToSchema = async (player: Player): Promise<any> => {
        const equippedWeaponItemId = await this.itemService.findId(player.equippedItemList.weapon)
        const equippedMovementItemId = await this.itemService.findId(player.equippedItemList.foot)
        const equippedDefenceItemId = await this.itemService.findId(player.equippedItemList.shield)
        const inventoryItemIds = player.items.map(async d => await this.itemService.findId(d))

        return ({
            health: player.health,
            inventoryItemIds,
            equippedWeaponItemId,
            equippedMovementItemId,
            equippedDefenceItemId,
            walletMoney: player.wallet.money
        })
    }
}