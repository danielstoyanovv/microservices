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

const logger = new LoggerService().createLogger()
database.on("connect", (client: any) => {
    console.log("Postgres database established")
    client
        .query('CREATE TABLE IF NOT EXISTS comments (id INT, post_id INT, content VARCHAR(100), created_at Date)')
        .catch((err: any) => logger.error(err));
});

const app = express()

app.use(express.json())

app.use(cors())

app.use(helmet())

const port = process.env.COMMENTS_MICROSERVICE_PORT ||  4001

app.get("/posts/:id/comments", comments)
app.post("/posts/:id/comments", createComment)
app.listen(port, () => {
    console.log("listening on port", port)
})
