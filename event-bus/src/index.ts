import * as events from "node:events";

const express = require("express")
const cors = require("cors")
import helmet from "helmet";
require('dotenv').config();
import {
    Request,
    Response
} from "express"
import axios from "axios";

const app = express()
const port = process.env.EVENT_BUS_PORT || 4005

app.use(express.json())

app.use(cors())

app.use(helmet())

app.post("/events", (req: Request, res: Response) => {
    const event = req.body
    console.log(event)
    axios.post("http://localhost:4000/events", event)
    axios.post("http://localhost:4001/events", event)
    axios.post("http://localhost:4002/events", event)
    axios.post("http://localhost:4003/events", event)


    res.send({ status: "OK" })
})

app.listen(port, () => {
    console.log("listening on port", port)
})
