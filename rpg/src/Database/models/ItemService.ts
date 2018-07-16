import {Item} from '../../items/Item'
import {IItemModel, ItemModel} from './MongooseModels'
import {ModelToMongooseModelConverter} from './ModelToMongooseModelConverter'

class ItemService {
    public getIdOfItemInDatabase(item: Item): Promise<IItemModel> {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({name: ModelToMongooseModelConverter.convertItem(item).name})
                .then(doc => resolve(doc))
                .catch(err => console.error(err))
        })
    }

    public createItemEntryInDb(item: Item): Promise<IItemModel> {
        return new Promise((resolve, reject) => {
            const model = new ItemModel(ModelToMongooseModelConverter.convertItem(item))
            ItemModel.create(model)
                .then(docs => resolve(docs))
                .catch(err => reject(err))
        })
    }
}

export const itemService = new ItemService()