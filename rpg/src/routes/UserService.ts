import {User} from "../Database/UserModel"

export class UserService {
    constructor() {

    }

    async login(username: string, password: string): Promise<boolean> {
        let  user
        try {
            user = await User.findOne({username})
        } catch (err) {
            return Promise.reject('Cannot find User: ' + username + ', Error: ' + err)
        }
        try {
            return await user.comparePassword(password)
        } catch (err) {
            return Promise.reject('Error while Authentication: ' + err)
        }
    }

    async register(username: string, password: string): Promise<string> {
        const user = new User({
            username,
            password
        })
        try{
            await user.save()
            return user._id
        } catch (err) {
            return Promise.reject('Error While creating User: ' + err)
        }
    }

    isLoggedInMiddleware(res: Response, req: Request) {
    }
}