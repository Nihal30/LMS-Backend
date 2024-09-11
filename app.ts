require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
export const app = express();

// body parser 
app.use(express.json({ limit: '50mb' })); // imp for using cloudinary 

//cookie parser 
app.use(cookieParser())

//cors => cross origin resource sharing 
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

// testing api 
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Api is working"
    })
})

// unknown route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} Not Found`) as any;
    err.statusCode = 404;
    next(err);
})
