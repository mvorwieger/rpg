import {UserService} from '../Database/services/UserService'
import {JwtService} from '../routes/JwtService'
import {Inject} from 'typescript-ioc'
import {PlayerService} from '../Database/services/PlayerService'
import {Battle} from '../Battle/Battle'

export class UserController {
    constructor(@Inject private jwtService: JwtService, @Inject private userService: UserService, @Inject private playerService: PlayerService) { }

    public login = (req, res) => {
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        this.userService.login(user.username, user.password).then((correct) => {
            if (correct === true) {
                this.jwtService.createJwt({username: user.username})
                    .then((token) => res.status(200).send(token))
                    .catch(() => res.send(501).send('Internal Server Error'))
            } else {
                res.status(401).send({error: 'Wrong username or password'})
            }
        })
    }

    public register = (req, res) => {
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        this.userService.register(user.username, user.password)
            .then(success => {
                if (success) {
                    res.status(200).send({success: true})
                }
            })
            .catch(err => {
                res.status(501).send({error: "Internal Server Error"})
            })
    }

    public playerById = async(req, res) => {
        const playerId = req.params.id
        const username = req.token.username
        try{
            res.status(200).send(await this.userService.getCharacter(username, playerId))
        }catch (e) {
            res.status(401).send({error: `could not fetch player with id: ${playerId} from ${username}`, e})
        }
    }

    public profileInformation = (req, res) => {
        this.userService.profileInformation(req.token.username)
            .then(r => {
                const strippedUserModel = {
                    characters: r.characters,
                    username: r.username,
                }

                res.status(200).send(JSON.stringify(strippedUserModel))
            })
            .catch(e => res.status(401).send({error: 'could not fetch Profile Information', e}))
    }

    public addPlayerToUser = (req, res) => {
        const selectedRace = req.body.race
        const newPlayer = this.playerService.chooseRace(selectedRace)
        const username = req.token.username

        this.userService.createPlayerForUser(username, newPlayer)
            .then((user) => res.status(200).send(user))
            .catch(err => res.status(401).send({error: `Coudnt create ${selectedRace} for ${username}`, err}))
    }

    public getCharacters = (req, res) => {
        this.userService.getCharacters(req.token.username)
            .then(chars => res.status(200).send(chars))
            .catch(err => res.status(401).send({error: 'could not fetch characters', err}))
    }

    public battle = async(req, res) => {
        const playerId = req.params.id
        const user = req.token.username
        const opponentUserName = req.params.opponentUserName
        const opponentPlayerId = req.params.opponentPlayerId

        try {
            const playerModel = await this.userService.getCharacter(user, playerId)
            const opponentPlayerModel = await this.userService.getCharacter(opponentUserName, opponentPlayerId)

            res.status(200).send(await this.playerService.battle(playerModel, opponentPlayerModel))
        }catch (e) {
            res.status(501).send({error: `could not create battle`, e})
        }
    }
}