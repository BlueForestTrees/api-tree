import {existingRootPostSpec, newRootSpec} from "../../../expected/root/testPostRootData";
import {app} from "../../../../main";
import {run} from "../../../util/testIntegUtil";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegUtil";

describe('POST Root', function () {

    beforeEach(init);

    it('newRoot', run(() => postRoot(newRootSpec)));

    it('existing root', run(() => postRoot(existingRootPostSpec)));
});

export const postRoot = spec => request()
    .post('/api/root')
    .send(spec.req.body)
    .then(async res => {
        res.should.have.status(200);
        await assertDb(spec.db.expected);
        res.body.should.deep.equal(spec.res.body);
    });