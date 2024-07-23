import mongoose, { Schema, Document } from "mongoose";
import { ERole } from "./role.enum";

export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: ERole;
}

const UserSchema = new Schema({
  name: { type: String, require: true },
  surname: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, enum: ERole, default: ERole.USER, require: true },
});

export default mongoose.model<IUser>("Users", UserSchema);
