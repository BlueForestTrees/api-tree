import chai from 'chai';
import {initDatabase} from "../testIntegPlumbing";
import {emptyGetRoot, getRoots} from "../../../expected/root/testGetRootData";
import {app} from "../../../../main";

describe('GET Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    //TODO un test avec une certaine quantité

    it('return roots', done => testGetRootsWith(getRoots, done));

    it('return empty roots', done => testGetRootsWith(emptyGetRoot, done));

});

const testGetRootsWith = (spec, done) => {
    chai.request(app)
        .get(`/api/root/${spec.req._id}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
            done();
        });
};