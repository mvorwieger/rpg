import {ItemRepository} from '../Database/ItemRepository'
import {Inject} from 'typescript-ioc'
import {IItemModel} from '../Database/models/ItemModel'

export class ItemController {
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
        try {
            res.status(200).send(await this.itemService.addItemModel(itemModel))
        } catch (e) {
            res.status(400).send({error: '->', e})
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

    constructor(@Inject private itemService: ItemRepository) {
    }
}