import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserHandler = {
  async create(userData: IUser): Promise<IUser> {
    const newUser = new User(userData);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const savedUser = await newUser.save();
    return savedUser;
  },
  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return null;
    }
    const token = jwt.sign(
      { userId: user._id, userName: user.name, userEmail: user.email },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1h",
      }
    );
    console.log(token);
    return token;
  },
};

export default UserHandler;
