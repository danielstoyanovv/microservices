const express = require("express")
import "express-async-errors"
const cors = require("cors")
import helmet from "helmet";
require('dotenv').config();
import {
    Request,
    Response
} from "express"
import database from "./config/database";
import {DatabaseConnectionError} from "./errors/database-connection-error";
import {errorHandlerMiddleware} from "./middlewares/error-handlerMiddleware";
import {createPostRouter} from "./routes/posts/create";
import {allPostsRouter} from "./routes/posts/all";

console.log("Postgres database established")
database
    .query('CREATE TABLE IF NOT EXISTS posts (' +
        'id SERIAL PRIMARY KEY, ' +
        'title VARCHAR(50), ' +
        'created_at Date )')
    .catch((err: any) => {throw new DatabaseConnectionError(err)});

const app = express()

app.use(express.json())

app.use(cors())

app.use(helmet())

const port = process.env.POSTS_MICROSERVICE_PORT || 4000

app.use(allPostsRouter)
app.use(createPostRouter)
app.use(errorHandlerMiddleware)

app.post("/events", (req: Request, res: Response) => {
    console.log("Received event ", req.body.type)

    res.send({})
})

app.listen(port, () => {
    console.log("listening on port", port)
})
