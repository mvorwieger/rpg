import {ItemService} from '../Database/services/ItemService'

export class ItemController {
    constructor(private itemServcice: ItemService) {
        this.itemServcice = itemServcice
    }

    async getItemById(req, res) {
        const id = req.params.id
        res.status(200).send(await this.itemServcice.getItemById(id))
    }

    async getItems(req, res) {
        return await this.itemServcice.getAllItems()
    }
}