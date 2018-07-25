import {User} from "../models/UserModel"
import {Player} from '../../Unit/Player'
import {ItemIdService} from './ItemIdService'
import {PlayerModel} from '../models/ItemModel'
import {PlayerRepository} from '../PlayerRepository'

export class UserService {
    constructor(private playerRepository: PlayerRepository) {
        this.playerRepository = playerRepository
    }

    async login(username: string, password: string): Promise<boolean> {
        let  user
        try {
            user = await User.findOne({username})
        } catch (err) {
            return Promise.reject('Cannot find User: ' + username + ', Error: ' + err)
        }
        try {
            return await user.comparePassword(password)
        } catch (err) {
            return Promise.reject('Error while Authentication: ' + err)
        }
    }

    async register(username: string, password: string): Promise<string> {
        const user = new User({
            username,
            password
        })
        try{
            await user.save()
            return user._id
        } catch (err) {
            return Promise.reject('Error While creating User: ' + err)
        }
    }

    async createPlayerForUser(username: string, player: Player) {
        console.log(username)
        const playerModel = await this.playerRepository.createPlayer(player)
        const userModel = await User.findOne({username})
        userModel.characters.push(playerModel._id)
        await userModel.save()
        return userModel
    }

    async profileInformation(username: string): Promise<any> {
        return await User.findOne({username})
    }

    async getCharacters(username: string): Promise<any> {
        const userModel = await User.findOne({username})
        const PromiseCharacters = userModel.characters.map(id => this.playerRepository.getPlayer(id))
        return await Promise.all(PromiseCharacters)
    }
}