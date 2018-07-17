import {Model, Schema, Document} from 'mongoose'
import {BehaviourNames} from '../../items/Behaviours/Behaviour'
const mongoose = require('mongoose')

export var UnitSchema: Schema = new Schema({
    health: Number,
    moveBehaviourId: Number,
    attackBehaviourId: Number,
    defenceBehaviourId: Number,
})

export var PlayerSchema: Schema = new Schema({
    health: Number,
    inventoryItemIds: [String],
    equippedWeaponItemId: String,
    equippedMovementItemId: String,
    equippedDefenceItemId: String,
    walletMoney: Number,
})

export var ItemSchema: Schema = new Schema({
    rarity: String,
    value: Number,
    name: {
        type: String,
        unique: true
    },
    behaviourType: String,
    behaviourValues: {
        type: {
            behaviourAttackDamage: {
                type: Number,
                required: function () {
                    return this.behaviourType == BehaviourNames.AttackBehaviour
                }
            },
            behaviourMoveSpeed: {
                type: Number,
                required: function () {
                    return this.behaviourType == BehaviourNames.MoveBehaviour
                }
            },
            behaviourBlock: {
                type: {
                    behaviourBlockPercentage: Number,
                    behaviourBlockValue: Number
                },
                required: function () {
                    return this.behaviourType == BehaviourNames.DefenceBehaviour
                }
            }
        }, required: true
    }
})

export interface IPlayerModel extends Document {
}

export interface IItemModel extends Document {
}

export const ItemModel: Model<any> = mongoose.model('Item', ItemSchema)
export const PlayerModel: Model<IPlayerModel> = mongoose.model('Player', PlayerSchema)
