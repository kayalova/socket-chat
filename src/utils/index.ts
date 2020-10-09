import * as crypto from "crypto"

export const hashPassword = (password: string): string =>
    crypto.createHash("md5").update(password).digest("hex")
