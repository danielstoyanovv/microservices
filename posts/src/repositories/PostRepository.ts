"use strict";

import database from "../config/database";
import {PostRepositoryInterface} from "./PostRepositoryInterface";

export class PostRepository implements PostRepositoryInterface {

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