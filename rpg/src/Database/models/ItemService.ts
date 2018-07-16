import {Item} from '../../items/Item'
import {IItemModel, ItemModel} from './MongooseModels'
import {ModelToMongooseModelConverter} from './ModelToMongooseModelConverter'

class ItemService {
    public getIdOfItemInDatabase(item: Item): Promise<IItemModel> {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({name: ModelToMongooseModelConverter.convertItem(item).name}, (err, res) => {
                if (err) {
                    reject(err)
                    return
                }

                resolve(res)
            })
        })
    }

    public createItemEntryInDb(item: Item): Promise<IItemModel> {
        return new Promise(((resolve, reject) => {
            const model = new ItemModel(ModelToMongooseModelConverter.convertItem(item))
            ItemModel.create(model, (err, res) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(res)
            })
        }))
    }

}

export const itemService = new ItemService()