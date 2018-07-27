import {Item} from '../../items/Item'
import {IItemModel, ItemModel} from '../models/ItemModel'
import {AttackBehaviour} from '../../items/Behaviours/AttackBehaviour'
import {MoveBehaviour} from '../../items/Behaviours/MoveBehaviour'
import {DefenceBehaviour} from '../../items/Behaviours/DefenceBehaviour'
import {Behaviour, BehaviourNames, getBehaviourType} from '../../items/Behaviours/Behaviour'
import {Inject} from 'typescript-ioc'

export class ItemService {
    /**
     * gives you the items id if it can find the Item in the Database
     * @param {Item} item
     * @returns {Promise<IItemModel>}
     */
    public findId = (item: Item): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.itemModel.findOne({name: item.name})
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
            const model = new this.itemModel(this.convertItem(item))
            this.itemModel.create(model)
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
    public getAllItems = async () => await this.itemModel.find()
    /**
     * Finds item by id
     * @param {string} id
     * @returns {Promise<{}>}
     */
    public findById = async (id: string) => await this.itemModel.findById(id)
    public itemModelToItem = (model: IItemModel) => {
        let behaviour: Behaviour

        switch(model.behaviourType) {
            case(BehaviourNames.AttackBehaviour):
                behaviour = new AttackBehaviour(model.behaviourValues.behaviourAttackDamage)
                break
            case(BehaviourNames.MoveBehaviour):
                behaviour = new MoveBehaviour(model.behaviourValues.behaviourMoveSpeed)
                break
            case(BehaviourNames.DefenceBehaviour):
                behaviour = new DefenceBehaviour(model.behaviourValues.behaviourBlockPercentage, model.behaviourValues.behaviourBlockValue)
                break
        }

        return new Item(
            model.rarity,
            model.value as number,
            model.name,
            behaviour
        )
    }
    private itemModel: any

    constructor(@Inject itemModel: ItemModel) {
        this.itemModel = itemModel.Model
    }
}