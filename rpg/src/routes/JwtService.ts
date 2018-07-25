import {readFileSync} from 'fs'

const jwt = require('jsonwebtoken')

export class JwtService {
    public privateKey

    constructor() {
        // TODO: Inject the privateKey somehow
        this.privateKey = readFileSync('./jwtRS256.key')
    }

    public createJwt(payLoad): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.sign(payLoad, this.privateKey, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    }

    public verifyJwt(token): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.privateKey, (err, decoded) => {
                if (err) reject(err)
                resolve(decoded)
            })
        })
    }

    public authenticateJwt = (req, res, next) => {
        const token = req.token

        this.verifyJwt(token).then(decoded => {
            req.token = decoded
            console.log(req.token)
            console.log(decoded)
            next()
        }).catch(() => res.status(401).send('Unauthorized'))
    }
}