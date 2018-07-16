import {Connection} from 'mongoose'
import {Player} from '../../Unit/Player'
import {IPlayerModel, PlayerModel} from './MongooseModels'
import {ModelToMongooseModelConverter} from './ModelToMongooseModelConverter'

export class PlayerRepository {
    public id: any

    constructor(playerId?: any) {
        this.id = playerId
    }

    updatePlayer(player: Player): Promise<IPlayerModel> {
        return new Promise((resolve, reject) => {
            ModelToMongooseModelConverter.convertPlayer(player)
                .then(convertedPlayer => {
                    PlayerModel
                        .findById(this.id, (err, doc) => {
                            if (err) {
                                reject('Error on updating Player in db' + err)
                            }
                        })
                        .update(convertedPlayer, err => {
                            if (err) {
                                reject('Internal Server Error' + err)
                            }
                            resolve()
                        })
                }).catch(err => reject(err))
        })
    }

    public createPlayer(player: Player): Promise<IPlayerModel> {
        return new Promise((resolve, reject) => {
            ModelToMongooseModelConverter.convertPlayer(player).then((convertedPlayer: Player) => {
                PlayerModel.create(new PlayerModel(convertedPlayer)).then(doc => {
                    this.id = doc._id
                    resolve(doc)
                }).catch(err => console.error('Error while creating Player', err))
            })
        })
    }
}