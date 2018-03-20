import {createFacetSpec, addingFacet, updatingBleFacetSpec} from "../../../expected/facet/testPostFacetData";
import {app} from "../../../../main";
import {assertDb} from "../../../util/testIntegDatabase";import {init, request} from "../../../util/testIntegUtil";

const by = testDef => done => {
    request()
        .post(`/api/facet`)
        .send(testDef.req.body)
        .then(async (res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(testDef.res.body);
            await assertDb(testDef.db.expected);
            done();
        })
        .catch(function (err) {
            done(err);
        });
};

describe('POST Facet', function () {

    beforeEach(init);

    it('firstFacet', by(createFacetSpec));
    it('thirdFacet', by(addingFacet));
    it('updatingFacet', by(updatingBleFacetSpec));
});

