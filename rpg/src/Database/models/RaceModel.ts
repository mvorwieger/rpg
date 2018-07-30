import {Schema} from "mongoose"

const mongoose = require('mongoose')

const RaceSchema: Schema = new Schema({
    health: Number,
    inventory: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    weapon: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', require: true},
    movement: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', require: true},
    defence: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true},
    money: Number,
})

export const PlayerModel: any = mongoose.model('Race', RaceSchema)