import {Item} from '../items/Item'
import {IItemModel, ItemModel} from './MongooseModels'
import {ItemIdService} from './ItemIdService'

export class ItemService {
    constructor(private itemIdService: ItemIdService) {
        this.itemIdService = itemIdService
    }
    public getIdOfItemInDatabase(item: Item): Promise<IItemModel> {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({name: item.name})
                .then(doc => resolve(doc._id))
                .catch(err => reject(err))
        })
    }

    public createItemEntryInDb(item: Item): Promise<IItemModel> {
        return new Promise((resolve, reject) => {
            const model = new ItemModel(this.itemIdService.convertItem(item))
            ItemModel.create(model)
                .then(docs => resolve(docs))
                .catch(err => reject(err))
        })
    }

    public async getAllItems() {
        return await ItemModel.find()
    }

    public async getItemById(id: string) {
        return await ItemModel.findById(id)
    }
}
