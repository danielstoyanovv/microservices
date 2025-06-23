"use strict";

import database from "../config/database";
import {CommentRepositoryInterface} from "./CommentRepositoryInterface";

export class CommentRepository implements CommentRepositoryInterface {

    /**
     * Create comment
     * @param id
     * @param postId
     * @param content
     * @param status
     * @return {void}
     */
    async createComment(id: number, postId: string, content: string, status: string) {
        const createdAt = new Date()
        await database.query('INSERT INTO comments(id, post_id, content, status, created_at) ' +
            'VALUES ($1, $2, $3, $4, $5) '
            , [id, postId, content, status, createdAt])
    }

    /**
     *
     * @param field
     * @param value
     * @return {object}
     */
    async findByField(field: string, value: string) {
        const comments = await database.query("SELECT post_id, content, status from comments where " + field + "=$1",
            [value])
        return comments.rows
    }
}
