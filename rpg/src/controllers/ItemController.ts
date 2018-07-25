import {ItemService} from '../Database/services/ItemService'

export class ItemController {
    constructor(private itemServcice: ItemService) { }

    public getItemById = async(req, res) => {
        const id = req.params.id
        res.status(200).send(await this.itemServcice.findById(id))
    }

    public getItems = async(req, res) => await this.itemServcice.getAllItems()
}