"use strict";

import express, {Request, Response} from "express";
import {QueryService} from "../services/QueryService";
import {
    STATUS_OK,
    MESSEGE_SUCCESS
} from "../constants/data";

const service = new QueryService()
const router = express.Router()
router.get("/posts", [

], async (req: Request, res: Response) => {
    const posts = await service
        .getApprovedPosts()
    return res.status(STATUS_OK).json({
        status: MESSEGE_SUCCESS,
        data: posts,
        message: ""
    })
})
export { router as postsRouter }