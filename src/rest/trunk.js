const json = require('./util/json');
const express = require('express');
const router = express.Router();
const db = require('../repo/db');
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const units = require('../service/units');
const trunks = require('../service/trunks');

module.exports = router;

router.post('/api/trunk',
    [
        check('qt').exists().isInt(),
        check('displayUnit').exists().isIn(units.shortNames()),
        check('name').exists()
    ],

    json(async (req, res, next) => {
        validationResult(req).throw();
        return (await (await db).collection('Trees').insertOne(matchedData(req))).ops[0];
    })
);

router.post('/api/root',
    [
        check('trunkId').exists(),
        check('rootId').exists(),
        check('trunkQt').exists().isInt(),
        check('rootQt').exists().isInt(),
        check('displayUnit').exists().isIn(units.shortNames()),
        check('rootId', 'rootId and trunkId must be different').custom((rootId, {req}) => rootId !== req.body.trunkId),
        check('trunkId', 'specified trunk doesn\'t exist').custom((value) => trunks.contains(value)),
        check('rootId', 'specified root doesn\'t exist').custom((value) => trunks.contains(value))
    ],

    json(async (req, res, next) => {
        validationResult(req).throw();

        const rootCreation = matchedData(req);
        const trunk = await trunks.get(rootCreation.trunkId);
        const root = {
            rootId: rootCreation.rootId,
            qt: rootCreation.rootQt * (trunk.qt / rootCreation.trunkQt),
            displayUnit: rootCreation.displayUnit
        };

        return trunks.addRoot(trunk, root);

    })
);

router.delete('/api/trunk/:trunkId',
    [
        check('trunkId').exists().custom((value) => trunks.id(value)),
    ],
    json(async (req) => {
            validationResult(req).throw();
            return trunks.remove(req.params.trunkId);
        }
    )
);


router.delete('/api/root/:trunkId/:rootId',
    [
        check('trunkId').exists().isMongoId(),
        check('rootId').exists().isMongoId()
    ],
    json(async (req) => {
            validationResult(req).throw();
            return trunks.removeRoot(req.params.trunkId, req.params.rootId);
        }
    )
);

router.get('/api/search/:namepart',
    [
        check('namepart').exists().isLength({min:3})
    ],
    json(async (req) => {
            validationResult(req).throw();
            return trunks.search(req.params.namepart);
        }
    )
);