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
import database from "../config/database";
import axios from "axios";

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
        const createdAt = new Date()
        await database.query('INSERT INTO comments(id, post_id, content, created_at) VALUES ($1, $2, $3, $4)'
            , [commentId, postId, content, createdAt])
        await axios.post("http://localhost:4005/events", {
            type: "CommentCreated",
            data: {
                 id: commentId,
                 content,
                 postId
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
        const comments = await database.query('SELECT post_id, content from comments where post_id=' + req.params.id)
        return res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: comments.rows,
            message: ""
        })
    } catch (error) {
        logger.error(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        });
    }
}