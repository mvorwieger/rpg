const mongoose = require('mongoose')
import {RouterConfig} from './routes/RouterConfig'
const app = new RouterConfig().createRoutes()
mongoose.connect('mongodb://localhost/27017').then(() => {
    app.listen(80, () => console.log('Running port 80'))
})

