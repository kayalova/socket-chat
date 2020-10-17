import * as db from "../db"
import { User } from "../models/User"
import * as utils from "../utils"


export class UserService {

    static async isExists(email: string): Promise<boolean> {
        const connection = await db.openConnection()
        const repository = connection.getRepository(User)
        const [_, count] = await repository.findAndCount({ email })
        await connection.close()
        return !!count
    }

    static async create(name: string, email: string, password: string): Promise<void> {
        const hashedPassword = utils.hashPassword(password)

        const connection = await db.openConnection()
        const repository = connection.getRepository(User)
        const newUser = new User(name, email, hashedPassword)
        await repository.save(newUser)
        await connection.close()
    }

    static async find(email: string, password: string): Promise<User | undefined> {
        const hashedPassword: string = utils.hashPassword(password)

        const connection = await db.openConnection()
        const repository = connection.getRepository(User)

        const user = await repository.findOne({ email, password: hashedPassword })
        await connection.close()

        return user
    }
}