
import { TaskModel } from "../model/TaskModel";
import { countObject, nowTimeSpan } from "../helper/basic";


class TaskService {

    DEFAULT_FIELDS: string = 'task_name userid createdAt updatedAt';

    constructor() { }

    async findRow(conditions: any = [], fields: string = '') {
       
        if (countObject(conditions) == 0)
            return false;

        if (fields == '')
            fields = this.DEFAULT_FIELDS;


        try {
            const record = await TaskModel.findOne(conditions)
                .select(fields)
                .lean();
            return record;
        } catch (e) {
            return false;
        }
    }

    async findById(id: string, fields: string = '') {
        try {
            const record =
                await TaskModel.findById(id)
                    .select(fields || this.DEFAULT_FIELDS)
                    .lean();
            // .exec();
            return record;
        } catch (e) {
            return false;
        }
    }

    async getAll(filter: any, condition: any = {}, fields: any = '') {

        try {
            const record =
                await TaskModel.find(condition)
                    .limit(filter.limit)
                    .skip(filter.offset)
                    .sort('-createdAt')
                    .select(fields || this.DEFAULT_FIELDS)
                    .lean();
            // .exec();

            if (countObject(record) > 0)
                return record;
            else
                return false;

        } catch (e) {
            return false;
        }
    }
    async findAll(condition: any = {}, fields: any = '') {

        try {
            const record =
                await TaskModel.find(condition)
                    .select(fields || this.DEFAULT_FIELDS)
                    .lean();
            // .exec();

            if (countObject(record) > 0)
                return record;
            else
                return false;

        } catch (e) {
            return false;
        }
    }

    async countRecords(condition: any = {}) {
        try {
            const record =
                await TaskModel.countDocuments(condition)
                    .exec();

            return record;
        } catch (e) {
            return 0;
        }
    }

    async save(data: any) {
        const doc = new TaskModel(data);
        try {
            await doc.save();
            return doc;
        } catch (e) {
            return false;
        }
    }

    async update(id: string, data: any) {
        try {

            const update = await TaskModel.findByIdAndUpdate(id, data, {
                new: true
            });
            return update;
        } catch (e) {
            //console.log('update error');
            return false;
        }
    }

    async updateOne(filter: any, data: any) {
        try {
            const update = await TaskModel.findOneAndUpdate(filter, data, {
                new: true,
                upsert: true
            })
            return update;
        } catch (e) {
            //console.log('update error');
            //console.log(e);
            return false;
        }
    }

    async delete(id: string) {

        try {
            const update = await TaskModel.findByIdAndUpdate(id, { deleted: nowTimeSpan() }, {
                new: true
            })
            return update;
        } catch (e) {
            return false;
        }
    }

    async remove(id: string) {

        try {
            const removed = await TaskModel.findByIdAndDelete(id, { new: true });
            return removed;
        } catch (e) {
            return false;
        }

    }

}

export const taskService = new TaskService();