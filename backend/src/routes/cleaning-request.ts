import express, { Router, Request, Response } from "express";
import {cleaningService} from "common/src/types";

const router: Router = express.Router();

let database: cleaningService[] = [];

router.post("/", async function (req: Request, res: Response) {
    const data: cleaningService = req.body;
    database.push(data);
    console.log(database);
    res.status(200).json("added db object");
});

router.get("/", async function (req: Request, res: Response) {
    try {
        res.send(database);
        res.sendStatus(200);
    }
    catch (error) {
        console.error(`Error exporting Service Request data: ${error}`);
        res.sendStatus(500);
    }

}
);

export default router;
