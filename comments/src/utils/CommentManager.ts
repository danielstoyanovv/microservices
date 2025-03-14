"use strict";

import database from "../config/database";
export class CommentManager {
    #id: number
    #postId: string
    #content: string
    /**
     * Set id
     * @param {number} id
     * @return {this}
     */
    setId(id: number) {
        this.#id = id
        return this
    }

    /**
     * Get id
     * @return {number}
     */
    getId() {
        return this.#id
    }

    /**
     * Set post content
     * @return {string}
     */
    setContent(content: string) {
        this.#content = content
        return this
    }

    /**
     * Get post content
     * @return {string}
     */
    getContent() {
        return this.#content
    }

    /**
     * Set post id
     * @param {string} postId
     * @return {this}
     */
    setPostId(postId: string) {
        this.#postId = postId
        return this
    }

    /**
     * Get post id
     * @return {string}
     */
    getPostId() {
        return this.#postId
    }

    /**
     * Create comment
     * @return {void}
     */
    async createComment() {
        const createdAt = new Date()
        await database.query('INSERT INTO comments(id, post_id, content, created_at) ' +
            'VALUES ($1, $2, $3, $4) '
            , [this.getId(), this.getPostId(), this.getContent(), createdAt])
    }

}
