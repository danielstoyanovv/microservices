"use strict";

import express, {Request, Response} from "express";
import {QueryService} from "../services/QueryService";
import {PostRepository} from "../repositories/PostRepository";

const service = new QueryService(new PostRepository)

const router = express.Router()

router.post("/events", [

], async (req: Request, res: Response) => {
    const {type, data} = req.body
    handleEvent(type, data)
    res.send({})
})
export const handleEvent = (type: any, data:any) => {
    if (type === "PostCreated") {
        const {id, title} = data
        service
            .setId(id)
            .setTitle(title)
            .createPost()
    }

    if (type === "CommentCreated") {
        const {id, content, postId, status} = data
        service
            .setId(postId)
            .setCommentId(id)
            .setContent(content)
            .setStatus(status)
            .createPostWithComment()
    }

    if (type === "CommentUpdated") {
        const {id, status, postId, content} = data
        service.setId(postId)
            .setCommentId(id)
            .setContent(content)
            .setStatus(status)
            .updatePostStatus()
    }
}

export { router as eventsRouter }