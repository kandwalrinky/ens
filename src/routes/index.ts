import express, { Request, Response, NextFunction } from "express";
import { userValidation } from "../middleware/user/user.validations";
import { modifyRequestMiddleware } from "../middleware/modifyReqRes";
import { userController } from "../controller/UserController";

import { bookController } from "../controller/BookController";
import { auth } from "../middleware/Auth";

// import { eventController } from "../controller/eventController";

// import { communicationController } from "../controller/communicationController";

// import { notificationValidation } from "../middleware/notification.validation";

const apiRoutes = express.Router();
// start routes


apiRoutes.post('/register', (req: express.Request, res: express.Response, next: express.NextFunction) => modifyRequestMiddleware.requestModify(req, res, next),
    userValidation.create(), (req: express.Request, res: express.Response) => {
        userController.create(req, res)
    });


apiRoutes.post('/login', (req: express.Request, res: express.Response, next: express.NextFunction) => modifyRequestMiddleware.requestModify(req, res, next),
    userValidation.login(), (req: express.Request, res: express.Response) => {
        userController.generateToken(req, res)
    });


apiRoutes.post("/create-book", auth, (req: express.Request, res: express.Response, next: express.NextFunction) => modifyRequestMiddleware.requestModify(req, res, next),
    userValidation.createUpdateBook(), modifyRequestMiddleware.requestModify, (req: Request, res: Response) => {
        bookController.createOrUpdate(req, res)
    });


apiRoutes.put("/update-book/:id", auth, modifyRequestMiddleware.requestModify, (req: Request, res: Response) => {
    bookController.createOrUpdate(req, res);
});


apiRoutes.delete("/delete-book/:id", auth, modifyRequestMiddleware.requestModify, (req: Request, res: Response) => {
    bookController.delete(req, res);
});


apiRoutes.get("/book-list", auth, modifyRequestMiddleware.requestModify, (req: Request, res: Response) => {
    bookController.list(req, res);
});

apiRoutes.post("/show-book", auth, modifyRequestMiddleware.requestModify, (req: Request, res: Response) => {
    bookController.show(req, res);
});

export default apiRoutes;