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
import {RedisService} from "../services/RedisService";
import {LoggerService} from "../services/LoggerService";
import axios from "axios";

const redisClient = new RedisService().createClient
const logger = new LoggerService().createLogger()

export const createPost = async ( req: Request,  res: Response) => {
    try {
        const { title } = req.body
        if (title.length < 7 || title.length > 50) {
            return res.status(STATUS_UNPROCESSABLE_ENTITY).json({
                status: MESSEGE_ERROR,
                data: [],
                message: "Title is not valid, it scout be between 7 and 50 symbols."
            })
        }
        const id = Math.floor(Math.random() * 10000)
        await redisClient.hSet("posts", id, title);
        await axios.post("http://localhost:4005/events", {
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
    } catch (error) {
        logger.error(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        });
    }
}

export const posts = async ( req: Request,  res: Response) => {
    try {
        const posts = await redisClient.hGetAll("posts")
        return res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: posts,
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