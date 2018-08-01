import {debug} from "test-api-express-mongo/dist/util"
import path from 'path'
import fs from 'fs'
import {version} from './../package.json'

const ENV = {
    PORT: process.env.PORT || 8080,

    REST_PATH: process.env.DB_NAME || "src/rest",

    DB_NAME: process.env.DB_NAME || "BlueForestTreesDB",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 27017,
    DB_UPGRADE: process.env.DB_UPGRADE || "NONE",

    NODE_ENV: process.env.NODE_ENV || null,
    VERSION: process.env.npm_package_version,
    MORGAN: process.env.MORGAN || ':status :method :url :response-time ms - :res[content-length]',
    AUTH_TOKEN_SECRET: process.env.AUTH_TOKEN_SECRET || 'fqse6}@@@#{tc\'uauauaua_f\'}_^@{}@_{{}#~@26nt8/z(_ic;ç(_q206az\'\"tct;çp_²²\\\\\\\"',

    MAIL_CONFIG_PATH: process.env.MAIL_CONFIG_PATH ? path.resolve(process.env.MAIL_CONFIG_PATH,"mailConfig.json") : path.join(__dirname, "mailConfig.json"),
    MAIL_TEMPLATE_PATH: process.env.MAIL_TEMPLATE_PATH || path.join(__dirname, "../templates")
}

ENV.MAIL_CONFIG = JSON.parse(fs.readFileSync(ENV.MAIL_CONFIG_PATH, 'utf8'))

ENV.VERSION = version


debug({ENV})

export default ENV