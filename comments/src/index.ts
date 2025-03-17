const express = require("express")
const cors = require("cors")
import {
    createComment,
    comments,
} from "./controllers/commentsController";
import helmet from "helmet";
require('dotenv').config();
import database from "./config/database";
import {LoggerService} from "./services/LoggerService";
import {
    Request,
    Response
} from "express"

const logger = new LoggerService().createLogger()
database.on("connect", (client: any) => {
    console.log("Postgres database established")
    client
        .query('CREATE TABLE IF NOT EXISTS comments (' +
            'id SERIAL PRIMARY KEY, ' +
            'post_id INT, ' +
            'content VARCHAR(100), ' +
            'status VARCHAR(15), ' +
            'created_at Date)')
        .catch((err: any) => logger.error(err));
});

const app = express()

app.use(express.json())

app.use(cors())

app.use(helmet())

const port = process.env.COMMENTS_MICROSERVICE_PORT ||  4001

app.get("/posts/:id/comments", comments)
app.post("/posts/:id/comments", createComment)

app.post("/events", (req: Request, res: Response) => {
    console.log("Received event ", req.body.type)

    res.send({})
})
app.listen(port, () => {
    console.log("listening on port", port)
})
