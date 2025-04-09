"use strict";

import {
    Request,
    Response
} from "express"
import {
    STATUS_CREATED,
    STATUS_OK,
    STATUS_INTERNAL_SERVER_ERROR,
    MESSEGE_ERROR,
    MESSEGE_SUCCESS,
    MESSEGE_INTERNAL_SERVER_ERROR,
    STATUS_UNPROCESSABLE_ENTITY
} from "../constants/data"
import {LoggerService} from "../services/LoggerService";
import axios from "axios";
import {CommentService} from "../services/CommentService";

const service = new CommentService()

const logger = new LoggerService().createLogger()

export const createComment = async ( req: Request,  res: Response) => {
    try {
        const { content } = req.body
        if (content.length < 7 || content.length > 100) {
            return res.status(STATUS_UNPROCESSABLE_ENTITY).json({
                status: MESSEGE_ERROR,
                data: [],
                message: "Comment is not valid, it scout be between 7 and 100 symbols."
            })
        }
        const postId = req.params.id
        const commentId = Math.floor(Math.random() * 10000)
        const status = "pending"
        await service
            .setId(commentId)
            .setPostId(postId)
            .setContent(content)
            .setStatus(status)
            .createComment()
        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentCreated",
            data: {
                 id: commentId,
                 content,
                 postId,
                status
             }
        })
        return res.status(STATUS_CREATED).json({
            status: MESSEGE_SUCCESS,
            data: [
                commentId,
                postId,
                content
            ],
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

export const comments = async ( req: Request,  res: Response) => {
    try {
        const comments = await service
            .setPostId(req.params.id)
            .getPostComments()
        return res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: comments,
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