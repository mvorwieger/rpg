import {Document, Model, Schema, Types} from "mongoose"
const mongoose = require('mongoose')

export var PlayerSchema: Schema = new Schema({
    health: Number,
    inventoryItemIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    equippedWeaponItemId: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', require: true},
    equippedMovementItemId: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', require: true},
    equippedDefenceItemId: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true},
    walletMoney: Number,
})

export const PlayerModel: any = mongoose.model('Player', PlayerSchema)

export interface IPlayerModel extends Document {
}