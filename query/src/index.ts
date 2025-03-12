const express = require("express")
const cors = require("cors")
import helmet from "helmet";
require('dotenv').config()
import {
    Request,
    Response
} from "express"

const app = express()

app.use(express.json())

app.use(cors())

app.use(helmet())

const port = process.env.QUERY_MICROSERVICE_PORT || 4002

app.post("/posts", (req: Request, res: Response) => {

})

app.post("/events", (req: Request, res: Response) => {

})

app.listen(port, () => {
    console.log("listening on port", port)
})
