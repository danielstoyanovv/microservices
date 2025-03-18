"use strict";

import database from "../config/database";
export class PostManager {
    #id: number
    #title: string

    /**
     * Set post id
     * @param {number} id
     * @return {this}
     */
    setId(id: number) {
        this.#id = id
        return this
    }

    /**
     * Get post id
     * @return {number}
     */
    getId() {
        return this.#id
    }

    /**
     * Set post title
     * @param {string} title
     * @return {string}
     */
    setTitle(title: string) {
        this.#title = title
        return this
    }

    /**
     * Get post title
     * @return {string}
     */
    getTitle() {
        return this.#title
    }

    /**

    /**
     * Create post
     * @return {void}
     */
    async createPost() {
        const createdAt = new Date()
        await database.query('INSERT INTO posts(id, title, created_at)' +
            ' VALUES ($1, $2, $3) '
            , [this.getId(), this.getTitle(), createdAt])
    }
}
