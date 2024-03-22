import { Request, Response } from "express";
import { errorRes, getRequestId, successRes, unauthorized, validationError } from "../helper/apiResponse";
import { validationResult } from "express-validator";
import { getRandomInteger } from "../helper/basic";
import { taskService } from "../services/TaskService";
import { HttpStatusCode } from "../interfaces/httpstatus";


class TaskController {
    constructor() {
    }

    async createOrUpdate(req: Request, res: Response) {
        const errors = validationResult(req).formatWith(({ msg }) => msg);

        if (!errors.isEmpty()) {
            return validationError(res, errors.array().toString());
        }

        try {

            if (!req.params.id) {

                const templateSave: any = await taskService.save(req.body);

                if (templateSave) {
                    return successRes(res, templateSave, HttpStatusCode.OK);
                }
            }


            if (req.params.id) {
                const existRule: any = await taskService.findRow({ id: req.params.id, user_id: req.body.user_id }, "id,filter_name");
                if (!existRule) {
                    return errorRes(res, "No template found", HttpStatusCode.NOT_FOUND);
                }
                let update: any = await taskService.update(req.params.id, req.body);
                if (update) {
                    return successRes(res, update, HttpStatusCode.OK);
                }

            }

            return errorRes(res, "Something went wrong", HttpStatusCode.NOT_FOUND);

        }

        catch (err) {
            return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
        }
    }


    async delete(req: Request, res: Response) {

        const errors = validationResult(req).formatWith(({ msg }) => msg);

        if (!errors.isEmpty()) {
            return validationError(res, errors.array().toString());
        }

        try {

            const existTemplate: any = await taskService.findRow({ id: req.params.id });

            if (!existTemplate) {
                return errorRes(res, "No Template found", HttpStatusCode.NOT_FOUND);
            }

            const result = await taskService.remove(req.params.id);
            if (!result) {
                return errorRes(res, "Record does not exists!", HttpStatusCode.NOT_FOUND);
            }

            return successRes(res, "Record Deleted Successfully!", HttpStatusCode.OK);

        } catch (err) {

            return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);

        }
    }

    async list(req: Request, res: Response) {

        const errors = validationResult(req).formatWith(({ msg }) => msg);

        if (!errors.isEmpty()) {
            return validationError(res, errors.array().toString());
        }

        try {

            const result: any = await taskService.findAll();

            if (!result) {
                return errorRes(res, "Record does not exists!", HttpStatusCode.NOT_FOUND);
            }

            return successRes(res, result, HttpStatusCode.OK);

        } catch (err) {

            return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);

        }
    }


    async show(req: Request, res: Response) {

        const errors = validationResult(req).formatWith(({ msg }) => msg);

        if (!errors.isEmpty()) {
            return validationError(res, errors.array().toString());
        }

        try {

            const result: any = await taskService.findRow(req.body);

            if (!result) {
                return errorRes(res, "Record does not exists!", HttpStatusCode.NOT_FOUND);
            }

            return successRes(res, result, HttpStatusCode.OK);

        } catch (err) {

            return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);

        }
    }

}

export const taskController = new TaskController();