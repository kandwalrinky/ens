import { Request, Response, NextFunction } from "express";
import { nopermission, unauthorized } from "../helper/apiResponse";
import { validateAccessToken } from "../helper/user";
class AuthHandler {
    constructor() {
    }

    verifyToken = async (req: Request, res: Response, next: NextFunction) => {

        const token:any =
            req.headers["authorization"];
        // req.body.token || req.query.token || req.headers["Bearer"];

        if (!token) return nopermission(res, "Token is required");


        const tokenSplit = token.split(' ');
        const newtoken = tokenSplit[1];

        // validate token with JWT algo
        let isValidToken = await validateAccessToken(newtoken);

        console.log('isValidToken------',isValidToken);
        
        if (!isValidToken) return unauthorized(res, "Invalid token");

        req.body.userid = isValidToken.id;
        req.body.email = isValidToken.email;
        req.body.role = isValidToken.role;
        req.query.userid = isValidToken.id;
        req.query.email = isValidToken.email;
        req.query.role = isValidToken.role;

        return next();

    }
}

export const auth = new AuthHandler().verifyToken;