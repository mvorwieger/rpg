import {Item} from '../../items/Item'
import {IItemModel, ItemModel} from '../models/ItemModel'
import {AttackBehaviour} from '../../items/Behaviours/AttackBehaviour'
import {MoveBehaviour} from '../../items/Behaviours/MoveBehaviour'
import {DefenceBehaviour} from '../../items/Behaviours/DefenceBehaviour'
import {Behaviour, BehaviourNames, getBehaviourType} from '../../items/Behaviours/Behaviour'

export class ItemService {
    /**
     * gives you the items id if it can find the Item in the Database
     * @param {Item} item
     * @returns {Promise<IItemModel>}
     */
    public findId = (item: Item): Promise<any> => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({name: item.name})
                .then(doc => resolve(doc._id))
                .catch(err => reject(err))
        })
    }
    /**
     * Adds an item To the mongo Database
     * @param {Item} item
     * @returns {Promise<IItemModel>}
     */
    public addItem = (item: Item): Promise<IItemModel> => {
        return new Promise((resolve, reject) => {
            const model = new ItemModel(this.convertItem(item))
            ItemModel.create(model)
                .then(docs => resolve(docs))
                .catch(err => reject(err))
        })
    }
    /**
     * converts the Item class to the mongoose schema
     * @param {Item} item
     * @returns {} ItemSchema For Mongoose
     */
    public convertItem = (item: Item) => {
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
    /**
     * Returns all items in the Database
     * @returns {Promise<{}[]>}
     */
    public getAllItems = async () => await ItemModel.find()
    /**
     * Finds item by id
     * @param {string} id
     * @returns {Promise<{}>}
     */
    public findById = async (id: string) => await ItemModel.findById(id)

    public itemModelToItem = (itemModel: IItemModel) => {
        let behaviour: Behaviour

        switch(itemModel.behaviourType) {
            case(BehaviourNames.AttackBehaviour):
                behaviour = new AttackBehaviour(itemModel.behaviourValues.behaviourAttackDamage)
                break
            case(BehaviourNames.MoveBehaviour):
                behaviour = new MoveBehaviour(itemModel.behaviourValues.behaviourMoveSpeed)
                break
            case(BehaviourNames.DefenceBehaviour):
                behaviour = new DefenceBehaviour(itemModel.behaviourValues.behaviourBlockPercentage, itemModel.behaviourValues.behaviourBlockValue)
                break
        }

        return new Item(
            itemModel.rarity,
            itemModel.value as number,
            itemModel.name,
            behaviour
        )
    }
}