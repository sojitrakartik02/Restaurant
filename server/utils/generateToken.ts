import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model";
import { Response } from "express";

// export const generateToken = (res: Response, user: IUserDocument) => {
//     console.log("Secret Key:", process.env.SECRET_KEY);

//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, { expiresIn: '1d' });
//     res.cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
//     return token;
// }

export const generateToken = (res: Response, user: IUserDocument) => {
    console.log("Secret Key:", process.env.SECRET_KEY);

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, { expiresIn: '1d' });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production'
    });

    return token;
}
