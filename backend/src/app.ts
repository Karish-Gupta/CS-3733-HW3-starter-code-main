import express from 'express';
import request from "./routes/cleaning-request";

const app = express();

app.use(express.json());

app.use("/api/cleaning-request", request);

app.listen(3001, () => {
    console.log("started");
});