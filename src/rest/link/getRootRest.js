import {appendOid, validPathAttributeId, validPathBqt, validPathTrunkId, validTrunkId} from "../../validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../collections"
import {col} from "mongo-registry"
import configure from "items-service"
import {map} from "lodash"

const router = Router()

module.exports = router

const rootService = configure(() => col(cols.ROOT))
const trunkService = configure(() => col(cols.TRUNK))

router.get('/api/tree/root/:trunkId',
    validPathTrunkId,
    run(appendOid(col(cols.TRUNK), "_id", "trunkId"), "APPEND OID"),
    run(rootService.findMixin({trunkId: 0})),
    run(trunkService.append(
        "rootId",
        {name: 1, color: 1, 'quantity.g': 1},
        (root, rootTrunk) => ({
            linkId: root._id,
            _id: root.rootId,
            relativeTo: root.relativeTo,
            trunk: {
                name: rootTrunk.name,
                color: rootTrunk.color,
                quantity: {bqt: root.bqt, g: rootTrunk.quantity.g}
            }
        })
    ))
)

router.get('/api/tree/root/tree/:trunkId',
    validTrunkId,
    run(appendOid(col(cols.TRUNK), "_id", "trunkId"), "APPEND OID"),
    run(rootService.treeRead(cols.ROOT, "trunkId", "rootId"))
)

/**
 * Donne la liste des trunk ID qui porte cet attribut, et la bqt de trunk pour correspondre à la bqt de attr.
 */
router.get(`/api/tree/root/equiv/:bqt/:attrId`,
    validPathBqt,
    validPathAttributeId,
    run(({bqt, attrId}, req, res) => {
        res.locals.bqt = bqt

        const bqtFilter = bqt === 0 ? {bqt: 0} : {bqt: {$ne: 0}}

        return col(cols.ROOT)
            .aggregate(
                [
                    {$match: {[`rootId`]: attrId, ...bqtFilter}},
                    {$sample: {size: 15}}
                ]
            ).toArray()
    }),
    run((attributes, req, res) => map(attributes, attr => ({
        _id: attr.trunkId,
        bqt: (res.locals.bqt / attr.bqt) || 0
    })))
)