const mongoose = require('mongoose')
import {RouterConfig} from './routes/RouterConfig'
import {NoAttack, NoDefence, NoMovement} from './items/NoItem'

const app = new RouterConfig().createRoutes()

mongoose.connect('mongodb://localhost/27017').then(() => {
    app.listen(80, () => console.log('Running port 80'))
})

