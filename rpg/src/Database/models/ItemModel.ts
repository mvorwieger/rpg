import {Model, Schema, Document} from 'mongoose'
import {BehaviourNames} from '../../items/Behaviours/Behaviour'
import {Singleton} from 'typescript-ioc'
import {Rarity} from '../../items/defaults/Raritys'

const mongoose = require('mongoose')
@Singleton
export class ItemModel {
    public ItemSchema: Schema = new Schema({
        rarity: {
            type: String,
            required: true,
            //https://github.com/Microsoft/TypeScript/issues/17198#issuecomment-315400819
            enum: Object.keys(Rarity).map(key => Rarity[key as any])
        },
        value: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        behaviourType: {
            type: String,
            required: true,
            //https://github.com/Microsoft/TypeScript/issues/17198#issuecomment-315400819
            enum: Object.keys(BehaviourNames).map(key => BehaviourNames[key as any])
        },
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

    public Model: Model<IItemModel> = mongoose.model('Item', this.ItemSchema)
}

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



