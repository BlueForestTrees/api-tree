import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {init, withTest} from "test-api-express-mongo/dist/api"
import {putRelativeToRootSpec, setQuantityRootSpec, updateQuantityAnotherUnitRootSpec, updateQuantityRootSpec} from "../../../spec/root/testPutRootSpec"

describe('PUT Root', function () {

    beforeEach(init(api, ENV, cols))

    it('put root with quantity', withTest(setQuantityRootSpec))
    it('put root with relativeTo', withTest(putRelativeToRootSpec))
    it('update quantity', withTest(updateQuantityRootSpec))
})