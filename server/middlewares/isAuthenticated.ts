import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            id: string;
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        console.log("Retrieved Token:", token);



        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
        console.log('decode', decode)
        if (!decode) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.error("Authentication error:", error); // Log the error for debugging

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];
//         console.log("Retrieved Token:", token);

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User not authenticated"
//             });
//         }

//         const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
//         console.log('decode', decode);
//         if (!decode) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid token"
//             });
//         }
//         req.id = decode.userId;
//         next();
//     } catch (error) {
//         console.error("Authentication error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// }
