import { Pool } from "pg"
import * as settings from "../settings"


const db = {
    pool: new Pool(settings.initDBSettings()),
    async query(q: string, params: string[]) {
        return await this.pool.query(q, params)
    }
}

export default db
