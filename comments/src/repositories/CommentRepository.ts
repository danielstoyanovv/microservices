"use strict";

import database from "../config/database";

export class CommentRepository {

    /**
     * Create comment
     * @param id
     * @param postId
     * @param content
     * @param status
     * @return {void}
     */
    async createComment(id:number, postId: string, content: string, status: string) {
        const createdAt = new Date()
        await database.query('INSERT INTO comments(id, post_id, content, status, created_at) ' +
            'VALUES ($1, $2, $3, $4, $5) '
            , [id, postId, content, status, createdAt])
    }

    /**
     * find all comments by post id
     * @param id
     * @return {object}
     */
    async findById(id: string) {
        const comments = await database .query('SELECT post_id, content, status from comments where post_id=$1',
            [id])
        return comments.rows
    }
}
