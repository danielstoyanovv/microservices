"use strict";

import database from "../config/database";
export class PostRepository {

    /**
     *
     * @param id
     * @param title
     * @param comments
     * @param status
     * @return {void}
     */
    async createPost(id: number, title: string, comments: string, status: string) {
        await database.query('INSERT INTO posts(id, title, comments, status) ' +
            'VALUES ($1, $2, $3, $4) '
            , [id, title, comments, status])
    }

    /**
     * Delete post
     * @param id
     * @return {void}
     */
    async deletePost(id: number) {
        await database.query('DELETE FROM posts WHERE id= ($1) '
            , [id])
    }

    /**
     * Update post status
     * @param id
     * @param data
     * @return {void}
     */
    async updatePost(id: number, data: string) {
        await database
            .query('UPDATE posts ' +
                'SET status = $1 ' +
                'WHERE id= ($2) '
                , [data, id])
    }

    /**
     * Find post
     * @param id
     * @return {object}
     */
    async findById(id: number) {
        const post = await database
            .query('SELECT id, title, comments, status FROM posts WHERE id= ($1) '
                , [id])
        return post.rows
    }

    /**
     *
     * @param id
     * @return {boolean}
     */
    async existsPost(id: number) {
        const existsPost = await database
            .query('SELECT id FROM posts WHERE id= ($1) '
                , [id])
        return existsPost.rowCount == 1 ? true : false
    }

    async findByField() {
        const approvedData = await database
            .query('SELECT title, comments, status from posts where to_tsvector(status) @@ to_tsquery(\'approved\')')
        return approvedData.rows
    }

}