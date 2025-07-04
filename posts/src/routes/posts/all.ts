"use strict";

import express, {Request, Response} from "express";
import {
    MESSEGE_SUCCESS,
    STATUS_OK
} from "../../constants/data";
import {PostService} from "../../services/PostService";
import {PostRepository} from "../../repositories/PostRepository";

const service = new PostService(new PostRepository())
const router = express.Router()

router.get("/posts", [

], async (req: Request, res: Response) => {
    const posts = await service
        .getPosts()
    return res.status(STATUS_OK).json({
        status: MESSEGE_SUCCESS,
        data: posts,
        message: ""
    })
})

export { router as allPostsRouter }