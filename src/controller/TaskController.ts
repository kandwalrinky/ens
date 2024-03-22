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

                let data: any = {
                    task_name: req.body.task_name,
                    userid: req.body.userid
                }

                const TaskSave: any = await taskService.save(data);

                if (TaskSave) {
                    return successRes(res, TaskSave, HttpStatusCode.OK);
                }
            }


            if (req.params.id) {
                const existTask: any = await taskService.findRow({ _id: req.params.id, userid: req.body.userid }, "Task_name");
                if (!existTask) {
                    return errorRes(res, "No Task found of user", HttpStatusCode.NOT_FOUND);
                }
                let updata: any = {
                    Task_name: req.body.Task_name,
                    author: req.body.author
                }
                let update: any = await taskService.update(req.params.id, updata);
                if (update) {
                    return successRes(res, update, HttpStatusCode.OK);
                }

            }

            return errorRes(res, "Something went wrong", HttpStatusCode.NOT_FOUND);

        }

        catch (err) {
            console.log(err.message);
            return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
        }
    }


    async delete(req: Request, res: Response) {

        const errors = validationResult(req).formatWith(({ msg }) => msg);

        if (!errors.isEmpty()) {
            return validationError(res, errors.array().toString());
        }

        try {

            const existTask: any = await taskService.findRow({ _id: req.params.id });

            if (!existTask) {
                return errorRes(res, "No Task found", HttpStatusCode.NOT_FOUND);
            }

            if (req.body.role == 'admin') {

                const result = await taskService.remove(req.params.id);
                if (!result) {
                    return errorRes(res, "Record does not exists!", HttpStatusCode.NOT_FOUND);
                }

            }

            else {

                return errorRes(res, "Admin User can delete the Task", HttpStatusCode.NOT_FOUND);

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

}

export const taskController = new TaskController();