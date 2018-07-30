import {Player} from '../../Unit/Player'
import {PlayerRepository} from '../PlayerRepository'
import {Inject} from 'typescript-ioc'
import {UserModel} from '../models/UserModel'

export class UserService {
    /**
     * Returns true if the users password is correct
     * @param {string} username
     * @param {string} password
     * @returns {Promise<boolean>}
     */
    public login = async (username: string, password: string): Promise<boolean> => {
        let user
        try {
            user = await this.userModel.findOne({username})
        } catch (err) {
            return Promise.reject('Cannot find User: ' + username + ', Error: ' + err)
        }
        try {
            return await user.comparePassword(password)
        } catch (err) {
            return Promise.reject('Error while Authentication: ' + err)
        }
    }
    /**
     * Used To Register a User
     * TODO: Add Error Handling for Duplicate Usernames
     * @param {string} username
     * @param {string} password
     * @returns {Promise<string>}
     */
    public register = async (username: string, password: string): Promise<string> => {
        const user = new this.userModel({
            username,
            password
        })
        try {
            await user.save()
            return user._id
        } catch (err) {
            return Promise.reject('Error While creating User: ' + err)
        }
    }
    /**
     *
     * @param {string} username
     * @param {Player} player
     * @returns {Promise<module:mongoose.Document>}
     */
    public createPlayerForUser = async (username: string, player: Player): Promise<Document> => {
        const playerModel = await this.playerRepository.add(player)
        const userModel = await this.userModel.findOne({username})
        userModel.characters.push(playerModel._id)
        await userModel.save()
        return userModel
    }
    /**
     * For now just gives us the Username and the character ids
     * Not sure if we already should give full information about the characters here because it could be used
     * To just display how many characters a player has and what his username is
     * @param {string} username
     * @returns {Promise<{}>}
     */
    public profileInformation = async (username: string): Promise<any> => {
        return this.userModel.findOne({username})
    }
    /**
     * Gets all the Characters of a User
     * @param {string} username
     * @returns {Promise<{}>}
     */
    public getCharacters = async (username: string): Promise<any> => {
        const userModel = await this.userModel.findOne({username})
        const PromiseCharacters = userModel.characters.map(id => this.playerRepository.find(id))
        return await Promise.all(PromiseCharacters)
    }
    /**
     * Gives u the character that belongs to the playerId if it belongs
     * to the user
     * @param username
     * @param playerId
     * @returns {Promise<IPlayerModel>}
     */
    public getCharacter = async (username, playerId) => {
        const userModel = await this.userModel.findOne({username})
        if (userModel.characters.find(char => char._id == playerId)) {
            return this.playerRepository.find(playerId)
        }
    }
    private userModel: any

    constructor(@Inject private playerRepository: PlayerRepository, @Inject userModel: UserModel) {
        this.userModel = userModel.Model
    }
}