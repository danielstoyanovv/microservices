const express = require("express")
const cors = require("cors")
import helmet from "helmet";
require('dotenv').config();
import {
    posts,
    createPost,
} from "./controllers/postsController";
import {
    Request,
    Response
} from "express"

const app = express()

app.use(express.json())

app.use(cors())

app.use(helmet())

const port = process.env.POSTS_MICROSERVICE_PORT || 4000

app.get("/posts", posts)

app.post("/posts", createPost)

app.post("/events", (req: Request, res: Response) => {
    console.log("Received event ", req.body.type)

    res.send({})
})

app.listen(port, () => {
    console.log("listening on port", port)
})
