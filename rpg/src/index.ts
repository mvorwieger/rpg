import {Player} from './Unit/Player'
import {MovementFactory} from './items/MovementFactory'
import {WeaponFactory} from './items/WeaponFactory'
import {ShieldFactory} from './items/ShieldFactory'
import {PlayerRepository} from './Database/models/PlayerRepository'

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
    const test = async() => {
        await playerRepository.createPlayer(player)
        player.wallet.add(124190284)
        await playerRepository.updatePlayer(player)
        const updatedPlayer = await playerRepository.getPlayer()
        console.log(updatedPlayer)
    }
    test()
}

start()
