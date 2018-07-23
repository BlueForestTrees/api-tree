#!/usr/bin/env node

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from "path";
import read from 'fs-readdir-recursive';
import {debug} from "./util/debug";
import {port} from "../env";
import express from 'express';
import ENV from "../env";
import morgan from 'morgan';
import {dbInit} from "trees-db-version";
import {initServices} from "./services";
import {registry} from "./db/dbRegistry";

console.log("API starting...");

const app = express();

const httpConf = () => {
    app.use(morgan(ENV.MORGAN));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
};

const logRequest = () => {
    app.use(function (req, res, next) {
        debug("req", {user: req.token && req.token.user, url: `${req.method} ${req.url}`}, {params: req.params}, {body: req.body});
        next();
    });
};

const rest = () => {
    read(path.join(__dirname, "rest")).forEach(function (file) {
        file.indexOf(".js") > 1 && app.use(require("./rest/" + file));
    });
};

const notFoundMiddleware = () => {
    app.use(function (req, res, next) {
        const err = new Error();
        err.status = 404;
        next(err);
    });
};

const errorMiddleware = () => {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        let responseBody = null;
        if (err.body) {
            responseBody = err.body;
        } else if (err.message) {
            responseBody = {error: err.message};
        }
        res.json(responseBody);
        debug("res", responseBody);
    })
};

const listen = () => {
    console.log("API listening on " + ENV.PORT + "...");
    return app.listen(ENV.PORT);
};

const started = () => {
    console.log("API started.");
    return app;
};

export const appPromise =
    dbInit(ENV, registry)
        .then(initServices)
        .then(httpConf)
        .then(logRequest)
        .then(rest)
        .then(notFoundMiddleware)
        .then(errorMiddleware)
        .then(listen)
        .then(started);
