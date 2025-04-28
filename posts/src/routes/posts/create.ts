"use strict";

import express, {Request, Response} from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError} from "../../errors/request-validation-error";
import {
    MESSEGE_SUCCESS,
    STATUS_CREATED
} from "../../constants/data";
import {PostService} from "../../services/PostService";
import axios from "axios";

const service = new PostService()
const router = express.Router()

router.post("/posts/create", [
    body("title")
        .trim()
        .isLength({ min: 7, max: 50 })
        .withMessage("title must be between 7 and 50 characters")
], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }
    const { title } = req.body
    const id = Math.floor(Math.random() * 10000)
    await service
        .setId(id)
        .setTitle(title)
        .createPost()
    await axios.post("http://event-bus-srv:4005/events", {
        type: "PostCreated",
        data: {
            id,
            title
        }
    })
    return res.status(STATUS_CREATED).json({
        status: MESSEGE_SUCCESS,
        data: {
            id: id,
            title: title
        },
        message: ""
    })
})

export { router as createPostRouter }