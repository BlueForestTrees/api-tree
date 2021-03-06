import {init, request, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/collections"
import {gateauTrunk} from "../../../database/gateau"

describe('DELETE Trunks', function () {

    beforeEach(init(api, ENV, cols))

    it('DELETE A TRUNK', withTest({
        req: {
            method: "DELETE",
            url: `/api/tree/trunk/${gateauTrunk._id}`
        },
        db: {
            expected: {
                colname: cols.TRUNK,
                missingDoc: gateauTrunk
            }
        }
    }))

})