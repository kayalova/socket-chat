import * as dotenv from "dotenv"
import * as path from "path"
import { User } from "../models/User"
import { ConnectionOptions } from "typeorm"

export const envconf = (): void => {
    dotenv.config({ path: path.join(__dirname, "..", "..", ".env") })
}

export const getEnvKey = (key: string) => process.env[key]

envconf()
export const dbConnectionOptions: ConnectionOptions = {
    type: "postgres",
    host: getEnvKey("DB_HOST"),
    port: Number(getEnvKey("DB_PORT")),
    username: getEnvKey("DB_USER"),
    password: getEnvKey("DB_PASSWORD"),
    database: getEnvKey("DB_NAME"),
    entities: [User],
    synchronize: true,
}
