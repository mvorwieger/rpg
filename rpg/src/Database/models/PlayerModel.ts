import {Document, Model, Schema} from "mongoose"
import {ItemService} from '../services/ItemService'
import {ItemIdService} from '../services/ItemIdService'
import {Item} from '../../items/Item'
const mongoose = require('mongoose')

export var PlayerSchema: Schema = new Schema({
    health: Number,
    inventoryItemIds: [String],
    equippedWeaponItemId: String,
    equippedMovementItemId: String,
    equippedDefenceItemId: String,
    walletMoney: Number,
})

export const PlayerModel: Model<IPlayerModel> = mongoose.model('Player', PlayerSchema)

export interface IPlayerModel extends Document {
}