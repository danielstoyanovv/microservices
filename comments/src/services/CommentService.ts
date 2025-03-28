"use strict";

import {CommentRepository} from "../repositories/CommentRepository";

const repository = new CommentRepository()
export class CommentService {
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
        await repository
            .createComment(this.getId(), this.getPostId(), this.getContent(), this.getStatus())
    }

    /**
     * get all comments for a specified post
     * @return {object} comments
     */
    async getPostComments() {
        return await repository
            .findByField("post_id", this.getPostId())
    }
}