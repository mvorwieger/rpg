import {NpcFactory} from './Unit/npc/NpcFactory'
import {Player} from './Unit/Player'
import {Level} from './Level'
import {MovementFactory} from './items/MovementFactory'
import {WeaponFactory} from './items/WeaponFactory'
import {ShieldFactory} from './items/ShieldFactory'

import {PlayerRepository} from './Database/models/PlayerRepository'

import {Battle} from './Battle/Battle'
import {ModelToMongooseModelConverter} from './Database/models/ModelToMongooseModelConverter'
import {itemService} from './Database/models/ItemService'
import {Document} from 'mongoose'

const mongoose = require('mongoose')

function start() {
    const player = new Player(
        WeaponFactory.createBasicSwordItem(),
        MovementFactory.createBareFeetItem(),
        ShieldFactory.createNoShieldItem()
    )

    mongoose.connect('mongodb://localhost/27017')
    const connection = mongoose.connection
    connection.on('error', err => console.log(err))
    connection.on('open', () => console.log('connected'))

    /**
     * How to Create a User
     * @type {PlayerRepository}
     */
    const playerRepository = new PlayerRepository()
    playerRepository.createPlayer(player).then((doc: Document) => {
        console.log(doc)
    })
}

start()
