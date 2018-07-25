import {UserService} from '../Database/services/UserService'
import {JwtService} from '../routes/JwtService'
import {PlayerRepository} from '../Database/PlayerRepository'
import {Player} from '../Unit/Player'
import {WeaponFactory} from '../items/WeaponFactory'
import {MovementFactory} from '../items/MovementFactory'
import {ShieldFactory} from '../items/ShieldFactory'
import {PlayerFactory} from '../Unit/PlayerFactory'

export class UserController {
    private userService: UserService

    constructor(
        private jwtService: JwtService,
        private playerRepository: PlayerRepository
    ) {
        this.jwtService = jwtService
        this.userService = new UserService(playerRepository)
        this.playerRepository = playerRepository
    }

    login = (req, res) => {
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
                res.status(401).send({error: 'Unauthorised'})
            }
        })
    }

    register = (req, res) => {
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

    profileInformation = (req, res) => {
        this.userService.profileInformation(req.token.username)
            .then(r => {
                const strippedUserModel = {
                    characters: r.characters,
                    username: r.username,
                }

                res.status(200).send(JSON.stringify(strippedUserModel))
            })
    }

    addPlayerToUser = (req, res) => {
        const newPlayer = PlayerFactory.createBasicPlayer()

        this.userService.createPlayerForUser(req.token.username, newPlayer)
            .then((user) => res.status(200).send(user))
    }

    getCharacters = (req, res) => {
        this.userService.getCharacters(req.token.username)
            .then(chars => res.status(200).send(chars))
    }
}