import axios from "axios";

const express = require("express")
import "express-async-errors"
const cors = require("cors")
import helmet from "helmet";
import database from "./config/database";
import {LoggerService} from "./services/LoggerService";
import {DatabaseConnectionError} from "./errors/database-connection-error";
import {eventsRouter} from "./routes/events";
import {postsRouter} from "./routes/posts";
import {handleEvent} from "./controllers/queryController";

require('dotenv').config()

const logger = new LoggerService().createLogger()
    console.log("Postgres database established")
database
    .query('CREATE TABLE IF NOT EXISTS posts (' +
        'id SERIAL PRIMARY KEY, ' +
        'title VARCHAR(50), ' +
        'comments TEXT, ' +
        'status TEXT)')
        .catch((err: any) => {throw new DatabaseConnectionError(err)});

const app = express()

app.use(express.json())

app.use(cors())

app.use(helmet())

const port = process.env.QUERY_MICROSERVICE_PORT || 4002

app.use(eventsRouter)
app.use(postsRouter)

app.listen(port, async () => {
    console.log("listening on port", port)
    const res = await axios.get("http://event-bus-srv:4005/events")
    for (let event of res.data) {
        console.log("Processing event: " + event.type)
        handleEvent(event.type, event.data)
    }
})
