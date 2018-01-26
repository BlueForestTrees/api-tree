import {cols} from "../../src/const/collections";
import {withQtParentTree} from "../data/database";
import _ from 'lodash';

const name = "RATtatouille1664";

export const post = {};

post.req = {
    body: {name},
};
post.res = {
    body: _id => ({_id, name})
};
post.db = {
    expected: _id => ({
        colname: cols.TREES,
        doc: {
            _id,
            ...post.req.body,
            name_lower: post.req.body.name.toLowerCase()
        }
    })
};

export const clone = {};

clone.req = {
    body: {
        sourceId: withQtParentTree._id
    }
};
clone.res = {
    body: _id => ({_id, ...(_.omit(withQtParentTree, '_id'))})
};
clone.db = {
    expected: _id => ({_id, ...(_.omit(withQtParentTree, '_id'))})
};