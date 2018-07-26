import {aTrunk} from "../../database/lettres";
import {arbreTrunk} from "../../database/skate";
import {withIdQuantity, withIdQtUnit} from "trees-test/dist/domain";

export const noBranchsTreeSpec = {
    req:{
        url:`/api/branch/tree/10/kg/${aTrunk._id}`
    },
    res:{
        body: {
            _id: aTrunk._id,
            quantity: {qt: 10,unit: "kg"},
            items: []
        }
    }
};

export const branchTreeSpec = {
    req:{
        url:`/api/branch/tree/100/count/${arbreTrunk._id}`
    },
    res:{
        body: {
            ...withIdQuantity(arbreTrunk._id, 100, "count"),
            items: [
                {
                    "_id": "999903c03e77667641d99995",
                    "quantity": {
                        "qt": 100,
                        "unit": "t"
                    },
                    "items": [
                        {
                            "_id": "999903c03e77667641d99991",
                            "quantity": {
                                "qt": 200000,
                                "unit": "count"
                            },
                            "items": [
                                {
                                    "_id": "999903c03e77667641d99990",
                                    "quantity": {
                                        "qt": 200000,
                                        "unit": "count"
                                    }
                                }
                            ]
                        },
                        {
                            "_id": "999903c03e77667641d99998",
                            "quantity": {
                                "qt": 100000,
                                "unit": "kg"
                            },
                            "items": [
                                {
                                    "_id": "999903c03e77667641d99999",
                                    "quantity": {
                                        "qt": 33333.333333333336,
                                        "unit": "h"
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "_id": "999903c03e77667641d99997",
                    "quantity": {
                        "qt": 0.1,
                        "unit": "count"
                    },
                    "items": [
                        {
                            "_id": "999903c03e77667641d99910",
                            "items": [
                                {
                                    "_id": "999903c03e77667641d99911"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
};