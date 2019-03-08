import {Router, run, thenNull} from 'express-blueforest'
import {col, object} from "mongo-registry"
import {validId, validBodyName, validBodyQuantityBqt, validBodyQuantityG, validUser, setOid} from "../../validations"
import ENV from "../../env"
import {createSender} from "simple-rbmq"

const router = Router()
module.exports = router

router.post('/api/tree/trunk',
    validId,
    validBodyName,
    validBodyQuantityG,
    validBodyQuantityBqt,
    validUser,
    run(setOid),
    run(createSender(ENV.RB.exchange, ENV.RK_TRUNK_UPSERT))
)