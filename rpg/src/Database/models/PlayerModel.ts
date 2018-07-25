import {Document, Model, Schema} from "mongoose"
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