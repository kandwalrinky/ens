import { Request, Response } from "express";
import { errorRes, getRequestId, successRes, unauthorized, validationError } from "../helper/apiResponse";
import { validationResult } from "express-validator";
import { getRandomInteger } from "../helper/basic";
import { bookService } from "../services/BookService";
import { HttpStatusCode } from "../interfaces/httpstatus";


class BookController {
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
                    book_name: req.body.book_name,
                    author: req.body.author,
                    userid: req.body.userid
                }

                const bookSave: any = await bookService.save(data);

                if (bookSave) {
                    return successRes(res, bookSave, HttpStatusCode.OK);
                }
            }


            if (req.params.id) {
                const existBook: any = await bookService.findRow({ _id: req.params.id, userid: req.body.userid }, "book_name");
                if (!existBook) {
                    return errorRes(res, "No Book found of user", HttpStatusCode.NOT_FOUND);
                }
                let updata: any = {
                    book_name: req.body.book_name,
                    author: req.body.author
                }
                let update: any = await bookService.update(req.params.id, updata);
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

            const existBook: any = await bookService.findRow({ _id: req.params.id });

            if (!existBook) {
                return errorRes(res, "No Book found", HttpStatusCode.NOT_FOUND);
            }

            if (req.body.role == 'admin') {

                const result = await bookService.remove(req.params.id);
                if (!result) {
                    return errorRes(res, "Record does not exists!", HttpStatusCode.NOT_FOUND);
                }

            }

            else {

                return errorRes(res, "Admin User can delete the book", HttpStatusCode.NOT_FOUND);

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

            const result: any = await bookService.findAll();

            if (!result) {
                return errorRes(res, "Record does not exists!", HttpStatusCode.NOT_FOUND);
            }

            return successRes(res, result, HttpStatusCode.OK);

        } catch (err) {

            return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);

        }
    }


}

export const bookController = new BookController();