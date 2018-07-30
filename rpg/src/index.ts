import {Item} from './items/Item'

const mongoose = require('mongoose')
import {RouterConfig} from './routes/RouterConfig'
import {Rarity} from './items/defaults/Raritys'
import {AttackBehaviour} from './items/Behaviours/AttackBehaviour'

const app = new RouterConfig().createRoutes()
const newItem = new Item(Rarity.common, 1000, "test", new AttackBehaviour(3))
console.log(JSON.stringify(newItem))
/*
mongoose.connect('mongodb://mivo:Grundig1999@ds257851.mlab.com:57851/rpg').then(() => {
    app.listen(80, () => console.log('Running port 80'))
})
*/
