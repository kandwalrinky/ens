import dotenv from "dotenv";
dotenv.config();

const NODE_ENVIRMENT = process.env.NODE_ENV;

switch (NODE_ENVIRMENT) {
    case 'development':
        dotenv.config({ path: '.envdev', override: true });
        break;
    case 'staging':
        dotenv.config({ path: '.envstage', override: true });
        break;
    default:
        dotenv.config({ path: '.envprod', override: true });
        break;
}

import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { HttpStatusCode } from "./interfaces/httpstatus"
import apiRoutes from "./routes/index";
import { errorRes, successRes } from "./helper/apiResponse";
import Database from "./config/database";

const { SERVER_PORT, HOST, NODE_ENV } = process.env;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let database = new Database();
database.connect();

app.use('/api/v1/', apiRoutes);
app.use('/', (req, res, next) => {

    res.send('' + Date.now());
});

// no route found start
app.use((req, res, next) => {
    const response = {
        status: false,
        message: "Page not found on the server"
    }
    errorRes(res, response.message, HttpStatusCode.NOT_FOUND);
});


app.listen(SERVER_PORT, () => {
    console.log(`server started at http://${HOST}:${SERVER_PORT}`);
});



//module.exports = app;