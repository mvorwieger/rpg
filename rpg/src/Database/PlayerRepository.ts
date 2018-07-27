import {Player} from '../Unit/Player'
import {ItemService} from './services/ItemService'
import {Inject,} from 'typescript-ioc'
import {IPlayerModel, PlayerModel} from './models/PlayerModel'

export class PlayerRepository {
    public playerId: string

    constructor(@Inject private itemService: ItemService, @Inject private playerModel: PlayerModel) { }
    /**
     * used to find a player By Id
     * @param {string} id
     * @returns {Promise<any>}
     */
    public find  = (id?: string): Promise<IPlayerModel> =>{
        const usedId = Boolean(id) ? id : this.playerId
        return this.playerModel.Model.findById(usedId)
            .populate('weapon')
            .populate('defence')
            .populate('movement')
            .populate('inventory')
            .exec()
    }

    /**
     * Replaces the Player Object at the current position of the Database with the new one
     * You can either pass the playerId or it will take the one created with the playerRepo
     * @param {Player} player
     * @param playerId
     * @returns {number} Updated Rows
     */
    public replace = async (player: Player, playerId?): Promise<number> => {
        const id = playerId ? playerId : this.playerId
        const convertedPlayer  = this.convertPlayerToSchema(player)
        return this.playerModel.Model
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
        return this.playerModel.Model.create(convertedPlayer)
    }

    /**
     * Used to convert the Player Class to the schema used in the Database
     * @param {Player} player
     * @returns {Promise<{}>}
     */
    public convertPlayerToSchema = async (player: Player): Promise<any> => {
        const weapon = await this.itemService.findId(player.equippedItemList.weapon)
        const movement = await this.itemService.findId(player.equippedItemList.foot)
        const defence = await this.itemService.findId(player.equippedItemList.shield)
        const inventory = player.items.map(async d => await this.itemService.findId(d))

        return ({
            health: player.health,
            inventory,
            weapon,
            movement,
            defence,
            money: player.wallet.money
        })
    }
}