import {Document, Schema} from "mongoose"
import {Singleton} from 'typescript-ioc'

const mongoose = require('mongoose')

@Singleton
export class PlayerModel {
    public PlayerSchema: Schema = new Schema({
        health: Number,
        inventory: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
        weapon: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', require: true},
        movement: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', require: true},
        defence: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true},
        money: Number,
    })
    public Model: any = mongoose.model('Player', this.PlayerSchema)
}

export interface IPlayerModel extends Document {
}