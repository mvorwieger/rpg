import {Model, Schema, Document} from 'mongoose'
import {BehaviourNames} from '../../items/Behaviours/Behaviour'
const mongoose = require('mongoose')

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

export interface IItemModel extends Document {
}

export const ItemModel: Model<any> = mongoose.model('Item', ItemSchema)

