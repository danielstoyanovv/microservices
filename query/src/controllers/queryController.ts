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
import database from "../config/database";
import {LoggerService} from "../services/LoggerService";
import {PostManager} from "../utils/PostManager";

const manager = new PostManager()

const logger = new LoggerService().createLogger()
export const posts = async ( req: Request,  res: Response) => {
    try {
        const posts = await database
            .query('SELECT id, title, comments FROM posts')
        return res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: posts.rows,
            message: ""
        })
    } catch (error) {
        logger.error(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({S
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        });
    }
}

export const events = async ( req: Request,  res: Response) => {
    try {
        const {type, data} = req.body
        if (type === "PostCreated") {
            const {id, title} = data
            manager
                .setId(id)
                .setTitle(title)
                .createPost()
        }
        if (type === "CommentCreated") {
            const { id, content, postId } = data
            manager
                .setId(postId)
                .setCommentId(id)
                .setContent(content)
                .createComment()
        }
    } catch (error) {
        console.log(error)
        logger.error(error)
    }
}