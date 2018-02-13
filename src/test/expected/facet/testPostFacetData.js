import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {replace} from "../../util/testUtil";
import {cols} from "../../../main/const/collections";
import {bleFacets, farine} from "../../database/gateau";
import {prixFacetEntry, vitBFacetEntry} from "../../database/facetEntries";

export const firstFacetSpec = {};
firstFacetSpec.req = {
    _id: farine._id,
    body: {
        facet: {
            _id: prixFacetEntry._id, qt: 144, unit: "m2"
        }
    }
};
firstFacetSpec.res = {
    body: oneUpsertedResponse(farine._id)
};
firstFacetSpec.db = {
    expected: {
        colname: cols.FACET,
        doc: {
            _id: farine._id,
            items: [
                {
                    _id: prixFacetEntry._id, qt: 144, unit: "m2"
                }
            ],

        }
    }
};

export const thirdFacet = {};
const trunkId = bleFacets._id;

let thridPostedFacetSpec = {
    _id: prixFacetEntry._id,
    qt: 144,
    unit: "m2"
};

thirdFacet.req = {
    _id: trunkId,
    body: {facet: thridPostedFacetSpec}
};

thirdFacet.res = {
    body: oneModifiedResponse
};

thirdFacet.db = {
    expected: {
        colname: cols.FACET,
        doc: {
            _id: trunkId,
            items: [
                ...bleFacets.items,
                thridPostedFacetSpec
            ],

        }
    }
};


export const updatingFacetSpec = {};
const updatingTrunkId = bleFacets._id;

let anotherFacetUpdate = {
    _id: vitBFacetEntry._id,
    qt: 14,
    unit: "m"
};

updatingFacetSpec.req = {
    _id: updatingTrunkId,
    body: {facet: anotherFacetUpdate}
};

updatingFacetSpec.res = {
    body: oneModifiedResponse
};

updatingFacetSpec.db = {
    expected: {
        colname: cols.FACET,
        doc: replace(bleFacets, "items", anotherFacetUpdate)
    }
};