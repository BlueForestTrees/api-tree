import {appPromise} from "../../main/index";
import chai, {expect} from 'chai';
import {initDatabase, updateDb} from "./testIntegDatabase";

let app = null;

export const request = () => chai.request(app);

export const withTest = spec => () => before(spec)
    .then(spec => request().get(spec.req.url)
        .then(res => {
            res.should.have.status(spec.res.code || 200);
            if (spec.res.body) {
                res.body.should.deep.equal(spec.res.body);
            }
        })
    );

export const init = async () => {
    await initDatabase();
    app = await appPromise;
};
export const run = job => done => {
    job()
        .then(() => done())
        .catch(err => done(err));
};
export const run2 = (job, spec) => done => {
    before(spec)
        .then(spec => job(spec))
        .then(() => done())
        .catch(err => done(err));
};

const before = async spec => {
    if (spec.db && spec.db.preChange) {
        await updateDb(spec.db.preChange);
    }
    return spec;
};

export const checkError = (call, spec) =>
    call(spec)
        .catch(err => {
            err.response.should.have.status(spec.res.errorCode);
            let resbody = null;
            try {
                resbody = JSON.parse(err.response.text)
            } catch (e) {
                throw new Error("response is not json");
            }
            resbody.should.deep.equal(spec.res.body);
        });
