"use strict";

import express, {Request, Response} from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError} from "../../errors/request-validation-error";
import {
    MESSEGE_SUCCESS,
    STATUS_CREATED,
} from "../../constants/data";
import {CommentService} from "../../services/CommentService";
import axios from "axios";

const service = new CommentService()
const router = express.Router()

router.post("/posts/:id/comments", [
    body("content")
        .trim()
        .isLength({ min: 7, max: 100 })
        .withMessage("Comment must be between 7 and 100 characters")
], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }
    const { content } = req.body
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

})

export { router as createCommentRouter }