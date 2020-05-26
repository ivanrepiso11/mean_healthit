import { Schema, model, Document } from "mongoose";

const user = new Schema({
    name: String,
    username: String,
    password: String,
    imagePath: String
});

interface IUser extends Document {
    name: string;
    username: string;
    password: string;
    imagePath: string;
}

export default model<IUser>('User', user);