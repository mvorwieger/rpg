import {ItemService} from '../Database/services/ItemService'
import {Inject} from 'typescript-ioc'

export class ItemController {
    constructor(@Inject private itemServcice: ItemService) { }

    public getItemById = async(req, res) => {
        const id = req.params.id
        try{
            res.status(200).send(await this.itemServcice.findById(id))
        }catch (e) {
            res.status(401).send({error: `Couldnt fetch Item for id: ${id}`, e})
        }
    }

    public getItems = async(req, res) => {
        try{
            res.status(200).send(await this.itemServcice.getAllItems())
        }catch (e) {
            res.status(401).send({error: `Error while fetching items`, e})
        }
    }
}