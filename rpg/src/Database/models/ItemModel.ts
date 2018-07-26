import {Model, Schema, Document} from 'mongoose'
import {BehaviourNames} from '../../items/Behaviours/Behaviour'

const mongoose = require('mongoose')

const ItemSchema: Schema = new Schema({
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
    rarity: string,
    value: string | number,
    name: string,
    behaviourType: string,
    behaviourValues: {
        behaviourAttackDamage?: number,
        behaviourMoveSpeed?: number,
        behaviourBlockPercentage?: number,
        behaviourBlockValue?: number
    }
}

export const ItemModel: Model<IItemModel> = mongoose.model('Item', ItemSchema)

