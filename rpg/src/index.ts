const mongoose = require('mongoose')
const app = require('./routes/routes')
mongoose.connect('mongodb://localhost/27017')
const connection = mongoose.connection
connection.on('error', err => console.log(err))
connection.on('open', () => console.log('connected'))

app.listen(80, () => console.log('Running port 80'))

