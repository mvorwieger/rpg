const jwt = require('jsonwebtoken')
export class JwtService {
    constructor(private privateKey) { }

    createJwt(payLoad) {
        return new Promise((resolve, reject) => {
            jwt.sign(payLoad, this.privateKey, (err, token) => {
                if(err) reject(err)
                resolve(token)
            })
        })
    }

   verifyJwt(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.privateKey, (err, decoded) => {
               if (err) reject(err)
               resolve(decoded)
            })
        })
    }
}