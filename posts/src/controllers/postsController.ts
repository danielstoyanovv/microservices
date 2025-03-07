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
    MESSEGE_INTERNAL_SERVER_ERROR
} from "../constants/data"
import {RedisService} from "../services/RedisService";
import {LoggerService} from "../services/LoggerService";
const { randomBytes } = require("crypto")

const redisClient = new RedisService().createClient
const logger = new LoggerService().createLogger()

export const createPost = async ( req: Request,  res: Response) => {
    try {
        const { title } = req.body
        const id = randomBytes(4).toString("hex")
        await redisClient.hSet("posts", id, title);
        return res.status(STATUS_CREATED).json({
            status: MESSEGE_SUCCESS,
            data: [
                id,
                title
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

export const posts = async ( req: Request,  res: Response) => {
    try {
        const posts = await redisClient.hGetAll("posts")
        return res.status(STATUS_CREATED).json({
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