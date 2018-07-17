import {Connection} from 'mongoose'
import {Player} from '../../Unit/Player'
import {IPlayerModel, PlayerModel} from './MongooseModels'
import {ModelToMongooseModelConverter} from './ItemIdService'

export class PlayerRepository {
    public id: any

    constructor(playerId?: any) {
        this.id = playerId
    }

    updatePlayer(player: Player): any {
        return new Promise((resolve, reject) => {
            ModelToMongooseModelConverter.convertPlayer(player)
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
            ModelToMongooseModelConverter.convertPlayer(player)
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