"use strict";

import express, {Request, Response} from "express";
import {
    MESSEGE_SUCCESS,
    STATUS_OK
} from "../../constants/data";
import {CommentService} from "../../services/CommentService";;

const service = new CommentService()
const router = express.Router()

router.get("/posts/:id/comments", [
    ], async (req: Request, res: Response) => {
    const comments = await service
        .setPostId(req.params.id)
        .getPostComments()
    return res.status(STATUS_OK).json({
        status: MESSEGE_SUCCESS,
        data: comments,
        message: ""
    })

})

export { router as allCommentsRouter }