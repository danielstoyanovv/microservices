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

const events: any = []

app.post("/events", (req: Request, res: Response) => {
    const event = req.body
    console.log(event)
    events.push(event)
    axios.post("http://posts-clusterip-srv:4000/events", event)
    axios.post("http://comments-clusterip-srv:4001/events", event)
    axios.post("http://query-clusterip-srv:4002/events", event)
    axios.post("http://moderation-clusterip-srv:4003/events", event)


    res.send({ status: "OK" })
})

app.get("/events", (req: Request, res: Response) => {
    res.send(events)
})

app.listen(port, () => {
    console.log("listening on port", port)
})
