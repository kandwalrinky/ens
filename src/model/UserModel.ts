import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/User";

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IUser>({
  firstName: {
    type: String,
    require: true,
    trim: true,
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  contactNumber: {
    type: String,
  }
}, {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: {
    currentTime: () => Math.floor(Date.now() / 1000)
  }
});

// 3. Create a Model.
export const UserModel = model<IUser>('User', schema);





