import { Request, Response } from "express";
import { errorRes, getRequestId, successRes, unauthorized, validationError } from "../helper/apiResponse";
import { validationResult } from "express-validator";
import { HttpStatusCode } from "../interfaces/httpstatus";
import { generateAccessToken } from "../helper/user";
import { userService } from "../services/UserService";
import sha1 from "sha1";
import bcrypt from "bcrypt";


class UserController {
  constructor() { }

  public generateToken = async (req: Request, res: Response): Promise<void> => {
    try {
      let user = await userService.login({
        email: req.body.email,
        password: sha1(req.body.password),
      });
      console.log('user-----------',user)
      if (user && user.email) {
        const data: any = {
          id:user._id,
          email: user.email,
          role: user.role,
        };
        const accessToken = await generateAccessToken(data);
        let token: any = {
          access_token: accessToken,
          access_token_type: "Bearer",
          access_expires_in: process.env.JWT_TOKEN_EXPIRE,
        };
        return successRes(res, token);
      } else {
        return errorRes(res, 'Invalid username & password.', HttpStatusCode.UNAUTHORIZED);
      }
    } catch (err) {
      console.log(err)
    }
  }

  async create(req: Request, res: Response) {
    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      return validationError(res, errors.array().toString());
    }

    try {
      const pwd = sha1(req.body.password);
      req.body.pwd = pwd
      const existUser: any = await userService.findRow({ email: req.body.email }, "email");

      if (existUser && existUser !== null) {
        return errorRes(res, "User email already exist", HttpStatusCode.NOT_FOUND);
      }

      if (existUser == null) {

        const saveData: any = {
          firstName: req.body?.firstName,
          lastName: req.body?.lastName,
          email: req?.body?.email,
          password: req?.body?.pwd,
          role: req?.body?.role,
          contactNumber: req?.body?.contactNumber
        };

        const userSave: any = await userService.save(saveData);

        if (userSave) {
          return successRes(res, userSave, HttpStatusCode.OK);
        }
      }

      return errorRes(res, "Something went wrong", HttpStatusCode.NOT_FOUND);

    }

    catch (err) {
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }

}
export const userController = new UserController();
