import { NextFunction, Response } from "express";
import { setRequestId } from "../helper/apiResponse";
import { generateUUID } from "../helper/basic";

class ModifyRequestMiddleware {
    constructor() { }

    requestModify(req: any, res: any, next: NextFunction) {
        const { request_id } = req.body;

        const requestId = generateUUID();
        req.body.request_id = requestId;
        setRequestId(req.body.request_id);
        // res.body.request_id = req.body.request_id;
        return next();
    }

}

export const modifyRequestMiddleware = new ModifyRequestMiddleware();