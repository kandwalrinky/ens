
import { BookModel } from "../model/BookModel";
import { countObject, nowTimeSpan } from "../helper/basic";


class BookService {

    DEFAULT_FIELDS: string = 'book_name author createdAt updatedAt';

    constructor() { }

    async findRow(conditions: any = [], fields: string = '') {
       
        if (countObject(conditions) == 0)
            return false;

        if (fields == '')
            fields = this.DEFAULT_FIELDS;

            console.log('conditions---',conditions);
            console.log('fields---',fields);

        try {
            const record = await BookModel.findOne(conditions)
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
                await BookModel.findById(id)
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
                await BookModel.find(condition)
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
                await BookModel.find(condition)
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
                await BookModel.countDocuments(condition)
                    .exec();

            return record;
        } catch (e) {
            return 0;
        }
    }

    async save(data: any) {
        console.log('data2---',data);
        const doc = new BookModel(data);
        console.log('doc----',doc);
        try {
            await doc.save();
            return doc;
        } catch (e) {
            console.log('e---',e);
            return false;
        }
    }

    async update(id: string, data: any) {
        try {

            const update = await BookModel.findByIdAndUpdate(id, data, {
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
            const update = await BookModel.findOneAndUpdate(filter, data, {
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
            const update = await BookModel.findByIdAndUpdate(id, { deleted: nowTimeSpan() }, {
                new: true
            })
            return update;
        } catch (e) {
            return false;
        }
    }

    async remove(id: string) {

        try {
            const removed = await BookModel.findByIdAndDelete(id, { new: true });
            return removed;
        } catch (e) {
            return false;
        }

    }

}

export const bookService = new BookService();