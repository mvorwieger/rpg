import {Player} from '../Unit/Player'
import {IPlayerModel, PlayerModel} from './MongooseModels'
import {ItemIdService} from './ItemIdService'

export class PlayerRepository {
    public id: any

    constructor(private itemIdService: ItemIdService, playerId?: any) {
        this.id = playerId
        this.itemIdService = itemIdService
    }

    public getPlayer(id?: string) {
        const usedId = Boolean(id) ? id : this.id
        return new Promise((resolve, reject) => {
            PlayerModel.findById(usedId)
                .then(doc => resolve(doc))
                .catch(err => reject(err))
        })
    }
    public updatePlayer(player: Player): any {
        return new Promise((resolve, reject) => {
            this.itemIdService.convertPlayer(player)
                .then(convertedPlayer => {
                    PlayerModel
                        .findById(this.id)
                        .update(convertedPlayer)
                        .then(doc => resolve(doc))
                        .catch(err => reject(err))
                })
                .catch(err => reject(err))
        })
    }

    public createPlayer(player: Player): Promise<IPlayerModel> {
        return new Promise((resolve, reject) => {
            this.itemIdService.convertPlayer(player)
                .then((convertedPlayer: Player) => {
                    PlayerModel.create(new PlayerModel(convertedPlayer))
                        .then(doc => {
                            this.id = doc._id
                            resolve(doc)
                        })
                        .catch(err => reject(err))
                })
                .catch(err => reject(err))
        })
    }
}