const express = require("express")
const { randomBytes } = require("crypto")

const app = express()

app.use(express.json())

const commentsByPostId = {}

const port = 4001
app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString("hex")
    const { content } = req.body
    const comments = commentsByPostId[req.param.id] || []
    comments.push({id: commentId, content})
    commentsByPostId[req.params.id] = comments
    res.status(201).send(comments)
})

app.listen(port, () => {
    console.log("listening on port", port)
})
