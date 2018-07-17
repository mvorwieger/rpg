import {Item} from '../../items/Item'
import {IItemModel, ItemModel} from './MongooseModels'
import {itemIdService} from './ItemIdService'

class ItemService {
    public getIdOfItemInDatabase(item: Item): Promise<IItemModel> {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({name: itemIdService.convertItem(item).name})
                .then(doc => resolve(doc._id))
                .catch(err => reject(err))
        })
    }

    public createItemEntryInDb(item: Item): Promise<IItemModel> {
        return new Promise((resolve, reject) => {
            const model = new ItemModel(itemIdService.convertItem(item))
            ItemModel.create(model)
                .then(docs => resolve(docs))
                .catch(err => reject(err))
        })
    }
}

export const itemService = new ItemService()