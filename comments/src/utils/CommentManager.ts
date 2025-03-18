"use strict";

import database from "../config/database";
export class CommentManager {
    #id: number
    #postId: string
    #content: string
    #status: string

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
     * @param {string} content
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
     * Set status
     * @param {string} status
     * @return {string}
     */
    setStatus(status: string) {
        this.#status = status
        return this
    }

    /**
     * Get status
     * @return {string}
     */
    getStatus() {
        return this.#status
    }

    /**
     * Create comment
     * @return {void}
     */
    async createComment() {
        const createdAt = new Date()
        await database.query('INSERT INTO comments(id, post_id, content, status, created_at) ' +
            'VALUES ($1, $2, $3, $4, $5) '
            , [this.getId(), this.getPostId(), this.getContent(), this.getStatus(), createdAt])
    }

}
