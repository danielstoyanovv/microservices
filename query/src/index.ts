const express = require("express")
const cors = require("cors")
import helmet from "helmet";
import {Request, Response} from "express"
import database from "./config/database";
import {LoggerService} from "./services/LoggerService";

require('dotenv').config()

const logger = new LoggerService().createLogger()
database.on("connect", (client: any) => {
    console.log("Postgres database established")
    client
        .query('CREATE TABLE IF NOT EXISTS posts_comments_data (id INT, title VARCHAR(50), comments TEXT)')
        .catch((err: any) => logger.error(err));
});

const app = express()

app.use(express.json())

app.use(cors())

app.use(helmet())

const port = process.env.QUERY_MICROSERVICE_PORT || 4002

app.get("/posts", async (req: Request, res: Response) => {
    const postsCommentsData = await database
        .query('SELECT id, title, comments FROM posts_comments_data')
    res.send(postsCommentsData.rows)
})

app.post("/events", async (req: Request, res: Response) => {
    const {type, data} = req.body

    if (type === "PostCreated") {
        try {
            const {id, title} = data
            await database.query('INSERT INTO posts_comments_data(id, title) VALUES ($1, $2) '
                , [id, title])
        } catch (error) {
            console.log(error)
            logger.error(error)
        }
    }

    if (type === "CommentCreated") {
        try {
            const { id, content, postId } = data
            const checkIfPostExistsInDatabase = await database
                .query('SELECT id, title, comments FROM posts_comments_data WHERE id= ($1) '
                , [postId])
            const comment = "{content: " + content + ", comment_id: " + id + ", post_id: " + postId + "}"
            const postsCommentsData = checkIfPostExistsInDatabase.rows
            if (checkIfPostExistsInDatabase.rowCount == 1) {
                postsCommentsData.map(async (value: any) => {
                    const currentId = value.id
                    const currentTitle = value.title
                    const currentComments = value.comments
                    const allComments = currentComments + comment
                    await database.query('DELETE FROM posts_comments_data WHERE id= ($1) '
                        , [postId])
                    await database.query('INSERT INTO posts_comments_data(id, title, comments) VALUES ($1, $2, $3) '
                        , [currentId, currentTitle, allComments])
                })
            } else {
                await database.query('INSERT INTO posts_comments_data(id, comments) VALUES ($1, $2) '
                    , [postId, comment])
            }
        } catch (error) {
            console.log(error)
            logger.error(error)
        }
    }


})

app.listen(port, () => {
    console.log("listening on port", port)
})
