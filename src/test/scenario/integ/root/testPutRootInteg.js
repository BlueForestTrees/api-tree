import chai from 'chai';
import {match, mock} from 'sinon';

import {app} from "../../../../main";

import {run} from "../../../testPlumbing";
import {updateQuantityRootSpec, setQuantityRootSpec, updateQuantityAnotherUnitRootSpec} from "../../../expected/root/testPutRootData";
import {assertDb, initDatabase} from "../../../testIntegDatabase";

describe('PUT Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('set quantity', run(() => putRoot(setQuantityRootSpec)));
    it('update quantity', run(() => putRoot(updateQuantityRootSpec)));
    it('update quantity with another unit', run(() => putRoot(updateQuantityAnotherUnitRootSpec)));
});

export const putRoot = testDef => chai.request(app)
    .put('/api/root')
    .send(testDef.req.body)
    .then(async (res) => {
        res.should.have.status(200);
        await assertDb(testDef.db.expected);
        res.body.should.deep.equal(testDef.res.body);
    });