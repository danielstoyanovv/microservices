
const express = require("express")
require('dotenv').config();
import {
    Request,
    Response
} from "express"
import axios from "axios";

const app = express()
const port = process.env.MODERATION_MICROSERVICE_PORT || 4003

app.use(express.json())

app.post("/events", async (req: Request, res: Response) => {
    const {type, data} = req.body
    if (type === "CommentCreated") {
        const status = data.content.includes("orange") ? "rejected" : "approved"

        await axios.post("http://localhost:4005/events", {
            type: "CommentModerated",
            data: {
                id: data.id,
                content: data.content,
                postId: data.postId,
                status
            }
        })
    }
})
app.listen(port, () => {
    console.log("listening on port", port)
})