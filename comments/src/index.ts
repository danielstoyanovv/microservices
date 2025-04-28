import axios from "axios";

const express = require("express")
import "express-async-errors"
const cors = require("cors")
import helmet from "helmet";
require('dotenv').config();
import database from "./config/database";
import {LoggerService} from "./services/LoggerService";
import {
    Request,
    Response
} from "express"
import {DatabaseConnectionError} from "./errors/database-connection-error";
import {errorHandlerMiddleware} from "./middlewares/error-handlerMiddleware";
import {createCommentRouter} from "./routes/comments/create";
import {allCommentsRouter} from "./routes/comments/all";

const logger = new LoggerService().createLogger()
console.log("Postgres database established")
database
    .query('CREATE TABLE IF NOT EXISTS comments (' +
        'id SERIAL PRIMARY KEY, ' +
        'post_id INT, ' +
        'content VARCHAR(100), ' +
        'status VARCHAR(15), ' +
        'created_at Date)')
    .catch((err: any) => {throw new DatabaseConnectionError(err)});

const app = express()

app.use(express.json())

app.use(cors())

app.use(helmet())

const port = process.env.COMMENTS_MICROSERVICE_PORT ||  4001

app.use(createCommentRouter)
app.use(allCommentsRouter)
app.use(errorHandlerMiddleware)

app.post("/events", async (req: Request, res: Response) => {
    console.log("Received event ", req.body.type)

    const {type, data} = req.body

    if (type === "CommentModerated") {
        const {id, postId, status, content} = data
        await database
            .query('UPDATE comments ' +
                'SET status = $1 ' +
                'WHERE id= ($2) '
                , [status, id])
            .catch((err: any) => logger.error(err));
        const commentData = {
            type: "CommentUpdated",
            data: {
                id,
                status,
                postId,
                content
            }
        }
        axios.post("http://event-bus-srv:4005/events", commentData).catch((err) => {
            logger.error(err.message)
            console.log(err.message);
        });
    }

    res.send({})
})
app.listen(port, () => {
    console.log("listening on port", port)
})
