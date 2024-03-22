import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/Book";

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IBook>({
    book_name: { type: String, required: true, trim: true },
    author: { type: String, required: false },
    userid: { type: String, required: false },
    createdAt: Number,
    updatedAt: Number,
    deleted: { type: Number, default: 0 }
}, {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: {
        currentTime: () => Math.floor(Date.now() / 1000)
    }
});

// 3. Create a Model.
export const BookModel = model<IBook>('Book', schema);