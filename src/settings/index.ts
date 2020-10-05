import * as dotenv from "dotenv"
import * as path from "path"

function envconf(): void {
    dotenv.config({ path: path.join(__dirname, "..", "..", ".env") })
}

export default { envconf }
