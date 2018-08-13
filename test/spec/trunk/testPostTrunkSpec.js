import {authGod} from "../../database/users"
import path from 'path'

export const postTrunkFileSpec = {
    req: {
        url: "/api/trunkBulk/ademe",
        method: "POST",
        file: {
            field: "xlsx.ademe.trunk",
            path: path.resolve("test/files/CUT_BIG_BI_1.09__02_Procedes_Details.xlsx")
        },
        headers: {
            ...authGod
        }
    },
    res: {
        bodypath: [
            {path: "$.ok", value: [true]},
            {path: "$.upsertions", value: [28]},
            {path: "$.insertions", value: [0]},
        ]
    }
}