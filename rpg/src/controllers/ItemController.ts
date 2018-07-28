import {ItemService} from '../Database/services/ItemService'
import {Inject} from 'typescript-ioc'
import {IItemModel} from '../Database/models/ItemModel'
import {Item} from '../items/Item'

export class ItemController {
    constructor(@Inject private itemService: ItemService) {
    }

    public getItemById = async (req, res) => {
        const id = req.params.id
        try {
            res.status(200).send(await this.itemService.findById(id))
        } catch (e) {
            res.status(401).send({error: `could not fetch Item for id: ${id}`, e})
        }
    }

    public getItems = async (req, res) => {
        try {
            res.status(200).send(await this.itemService.getAllItems())
        } catch (e) {
            res.status(401).send({error: `Error while fetching items`, e})
        }
    }

    public createItem = async (req, res) => {
        const itemModel: IItemModel = req.body
        let item: Item
        try {
            item = await this.itemService.itemModelToItem(itemModel)
        } catch (e) {
            res.status(401).send({error: 'bad item format', e})
        }
        try {
            const createdItem = await this.itemService.addItem(item)
            res.status(200).send(createdItem)
        } catch (e) {
            res.status(501).send({error: 'Database error', e})
        }
    }

    // TODO: create generic Malformed input error
    public updateItem = async (req, res) => {
        const itemModel: IItemModel = req.body
        const id = req.params.id

        this.itemService.updateItemById(id, itemModel)
            .then((response: any) => {
                if (response.ok) {
                    res.status(200).send({success: true})
                    return
                }
                throw 'malformed input'
            })
            .catch(err => res.status(400).send({error: 'Error while updating User Check your model format', err}))
    }
}