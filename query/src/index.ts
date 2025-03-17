const express = require("express")
const cors = require("cors")
import helmet from "helmet";
import database from "./config/database";
import {LoggerService} from "./services/LoggerService";
import {
    events,
    posts,
} from "./controllers/queryController";

require('dotenv').config()

const logger = new LoggerService().createLogger()
database.on("connect", (client: any) => {
    console.log("Postgres database established")
    client
        .query('CREATE TABLE IF NOT EXISTS posts (' +
            'id SERIAL PRIMARY KEY, ' +
            'title VARCHAR(50), ' +
            'comments TEXT, ' +
            'status VARCHAR(15))')
        .catch((err: any) => logger.error(err));
});

const app = express()

app.use(express.json())

app.use(cors())

app.use(helmet())

const port = process.env.QUERY_MICROSERVICE_PORT || 4002

app.get("/posts", posts)

app.post("/events", events)

app.listen(port, () => {
    console.log("listening on port", port)
})
