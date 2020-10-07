import * as dotenv from "dotenv"
import * as path from "path"


export const envconf = (): void => {
    dotenv.config({ path: path.join(__dirname, "..", "..", ".env") })
}

envconf()

export const getEnvKey = (key: string) => process.env[key]

export const initDBSettings = (): Object => {
    const host = getEnvKey("DB_HOST")
    const port = getEnvKey("DB_PORT")
    const user = getEnvKey("DB_USER")
    const database = getEnvKey("DB_NAME")
    const password = getEnvKey("DB_PASSWORD")

    return { host, port, user, database, password }
}

