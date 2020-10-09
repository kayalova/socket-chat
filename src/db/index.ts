import { createConnection } from "typeorm"
import * as settings from "../settings"

export const openConnection = async () => await createConnection(settings.dbConnectionOptions)