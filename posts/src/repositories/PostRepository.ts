"use strict";

import database from "../config/database";
export class PostRepository {

    /**
     * create post
     * @param id
     * @param title
     * @return {void}
     */
    async createPost(id: number, title: string) {
        const createdAt = new Date()
        await database.query('INSERT INTO posts(id, title, created_at)' +
            ' VALUES ($1, $2, $3) '
            , [id, title, createdAt])
    }

    /**
     * Get all posts
     */
    async findAll() {
        const posts = await database
            .query('SELECT id, title FROM posts')
        return posts.rows
    }
}