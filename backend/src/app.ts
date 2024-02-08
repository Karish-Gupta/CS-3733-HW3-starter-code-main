import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import request from "./routes/cleaning-request";

const app = express();

app.use(express.json());

app.use("/api/cleaning-request", request);

app.listen(3001, () => {
    console.log("started");
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction): void => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            status: err.status,
        },
    });
});


export default app;