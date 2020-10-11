import * as crypto from "crypto"

export const hashPassword = (password: string): string => {
    console.log(password)
    return crypto.createHash("md5").update(password).digest("hex")
}
