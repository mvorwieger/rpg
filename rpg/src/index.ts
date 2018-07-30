const mongoose = require('mongoose')
import {RouterConfig} from './routes/RouterConfig'

const app = new RouterConfig().createRoutes()

mongoose.connect('mongodb://mivo:Grundig1999@ds257851.mlab.com:57851/rpg', {useNewUrlParser: true}).then(() => {
    app.listen(80, () => console.log('Running port 80'))
})

