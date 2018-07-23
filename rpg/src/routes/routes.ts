import {UserService} from './UserService'
import {JwtService} from './JwtService'
import * as fs from "fs"
import {readFileSync} from 'fs'
import {UserController} from '../controllers/UserController'
import {PlayerRepository} from '../Database/PlayerRepository'
import {ItemService} from '../Database/ItemService'
import {ItemIdService} from '../Database/ItemIdService'
import {WeaponFactory} from '../items/WeaponFactory'
import {MovementFactory} from '../items/MovementFactory'
import {ShieldFactory} from '../items/ShieldFactory'
import {ItemController} from '../controllers/ItemController'

const express = require('express')
const bodyParser = require('body-parser')

const bearerToken = require('express-bearer-token')
const app = express()

// parse application/json
app.use(express.json())
app.use(bearerToken())
//TODO: move in separate File
const authenticateJwt = (req, res, next) => {
    const token = req.token

    const service = new JwtService(readFileSync('./jwtRS256.key'))
    service.verifyJwt(token).then(decoded => {
        req.token = decoded
        console.log(req.token)
        console.log(decoded)
        next()
    }).catch(() => res.status(401).send('Unauthorized'))
}

// TODO: move dependencies out of Router
const privateKey = readFileSync('./jwtRS256.key')
const jwtService = new JwtService(privateKey)
const itemIdService = new ItemIdService()
const itemService = new ItemService(itemIdService)
const playerRepository = new PlayerRepository(new ItemIdService())
const userController = new UserController(jwtService, playerRepository)
const itemController = new ItemController();
app.post('/login', userController.login)

app.post('/register', userController.register)

app.get('/me', authenticateJwt, userController.profileInformation)

app.post('/me/player', authenticateJwt, userController.addPlayerToUser)

app.get('/item/:id', itemController.getItemById)

app.get('/items', itemController.getItems)

app.get('/me/players', authenticateJwt, userController.getCharacters)

module.exports = app

