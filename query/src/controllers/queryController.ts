"use strict";

import {
    Request,
    Response
} from "express"
import {
    STATUS_OK,
    STATUS_INTERNAL_SERVER_ERROR,
    MESSEGE_ERROR,
    MESSEGE_SUCCESS,
    MESSEGE_INTERNAL_SERVER_ERROR,
} from "../constants/data"
import {LoggerService} from "../services/LoggerService";
import {QueryManager} from "../utils/QueryManager";

const manager = new QueryManager()
const logger = new LoggerService().createLogger()
export const posts = async ( req: Request,  res: Response) => {
    try {
        const posts = await manager
            .getApprovedPosts()
        return res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: posts,
            message: ""
        })
    } catch (error) {
        console.log(error)
        logger.error(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        });
    }
}

export const events = async ( req: Request,  res: Response) => {
    try {
        const {type, data} = req.body
        handleEvent(type, data)
        res.send({})
    } catch (error) {
        console.log(error)
        logger.error(error)
    }
}

export const handleEvent = (type: any, data:any) => {
    if (type === "PostCreated") {
        const {id, title} = data
        manager
            .setId(id)
            .setTitle(title)
            .createPost()
    }

    if (type === "CommentCreated") {
        const {id, content, postId, status} = data
        manager
            .setId(postId)
            .setCommentId(id)
            .setContent(content)
            .setStatus(status)
            .createPostWithComment()
    }

    if (type === "CommentUpdated") {
        const {id, status, postId, content} = data
        manager.setId(postId)
            .setCommentId(id)
            .setContent(content)
            .setStatus(status)
            .updatePostStatus()
    }
}