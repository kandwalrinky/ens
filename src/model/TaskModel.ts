import { model, Schema } from "mongoose";
import { ITask } from "../interfaces/Task";

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<ITask>({
    task_name: { type: String, required: true, trim: true },
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
export const TaskModel = model<ITask>('Task', schema);