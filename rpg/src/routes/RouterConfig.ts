import {JwtService} from './JwtService'
import {UserController} from '../controllers/UserController'
import {ItemController} from '../controllers/ItemController'
import {Inject, Singleton} from 'typescript-ioc'

const bodyParser = require('body-parser')
const express = require('express')
const bearerToken = require('express-bearer-token')

@Singleton
export class RouterConfig {
    @Inject userController: UserController
    @Inject itemController: ItemController
    @Inject jwtService: JwtService
    private app: any

    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(bearerToken())
    }

    public createRoutes() {
        this.app.post('/login', this.userController.login)
        this.app.post('/register', this.userController.register)
        this.app.get('/me', this.jwtService.authenticateJwt, this.userController.profileInformation)
        this.app.post('/me/player', this.jwtService.authenticateJwt, this.userController.addPlayerToUser)
        this.app.get('/me/player/:id', this.jwtService.authenticateJwt, this.userController.playerById)
        this.app.get('/item/:id', this.itemController.getItemById)
        this.app.get('/items', this.itemController.getItems)
        this.app.get('/me/players', this.jwtService.authenticateJwt, this.userController.getCharacters)
        this.app.get('/me/player/:id/fight/:opponentUserName/player/:opponentPlayerId', this.jwtService.authenticateJwt, this.userController.battle)

        return this.app
    }
}


