import {Singleton} from 'typescript-ioc'

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10

@Singleton
export class UserModel {
    UserSchema = new Schema({
        username: {type: String, required: true, index: {unique: true}},
        password: {type: String, required: true},
        characters: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}], default: []}
    })

    constructor() {
        this.UserSchema.pre('save', function (next) {
            const user = this
            if (!user.isModified('password')) return next()

            bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
                if (err) return next(err)

                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) return next(err)

                    user.password = hash
                    next()
                })
            })
        })

        this.UserSchema.methods.comparePassword = function (candidatePassword) {
            return new Promise((resolve, reject) => {
                bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
                    if (err) return reject(err)

                    resolve(isMatch)
                })
            })
        }
    }

    Model = mongoose.model('User', this.UserSchema)
}





