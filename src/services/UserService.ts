import { UserModel } from "../model/UserModel";
import { countObject, nowTimeSpan } from "../helper/basic";
// import Logger from "../utils/logger";
class UserService {
    DEFAULT_FIELDS: string = 'firstName lastName username email role contactNumber';
    constructor() { }

    async login(conditions: object = {}, fields: string = '') {
        try {
            if (fields == '')
                fields = this.DEFAULT_FIELDS;

            const record = await UserModel.findOne(conditions)
            .select(fields)
            .lean();
            return record;
        } catch (error) {

            return false;
        }
    }


    async save(data: any) {
        const doc = new UserModel(data);
        try {
            await doc.save();
            return doc;
        } catch (e) {
            return false;
        }
    }


    async findRow(conditions: any = [], fields: string = '') {

        if (countObject(conditions) == 0)
            return false;

        if (fields == '')
            fields = this.DEFAULT_FIELDS;

        try {
            const record = await UserModel.findOne(conditions)
                .select(fields)
                .lean();

            return record;
        } catch (e) {
            return false;
        }
    }



}

export const userService = new UserService();