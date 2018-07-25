import {Item} from '../../items/Item'
import {IItemModel, ItemModel} from '../models/ItemModel'
import {AttackBehaviour} from '../../items/Behaviours/AttackBehaviour'
import {MoveBehaviour} from '../../items/Behaviours/MoveBehaviour'
import {DefenceBehaviour} from '../../items/Behaviours/DefenceBehaviour'
import {getBehaviourType} from '../../items/Behaviours/Behaviour'

export class ItemService {
    constructor() { }
    public getIdOfItemInDatabase(item: Item): Promise<IItemModel> {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({name: item.name})
                .then(doc => resolve(doc._id))
                .catch(err => reject(err))
        })
    }

    public createItemEntryInDb(item: Item): Promise<IItemModel> {
        return new Promise((resolve, reject) => {
            const model = new ItemModel(this.convertItem(item))
            ItemModel.create(model)
                .then(docs => resolve(docs))
                .catch(err => reject(err))
        })
    }

    public convertItem(item: Item) {
        return {
            rarity: item.rarity,
            value: item.value,
            name: item.name,
            behaviourType: getBehaviourType(item.behaviour),
            behaviourValues: {
                behaviourAttackDamage: (item.behaviour as AttackBehaviour).attackDamage,
                behaviourMoveSpeed: (item.behaviour as MoveBehaviour).moveSpeed,
                behaviourBlockPercentage: (item.behaviour as DefenceBehaviour).blockPercentage,
                behaviourBlockValue: (item.behaviour as DefenceBehaviour).blockAmount
            }
        }
    }

    public async getAllItems() {
        return await ItemModel.find()
    }

    public async getItemById(id: string) {
        return await ItemModel.findById(id)
    }
}
