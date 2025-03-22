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

}