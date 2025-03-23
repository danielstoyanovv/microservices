"use strict";

import {PostRepository} from "../repositories/PostRepository";

const repository = new PostRepository()

export class QueryManager {
    #id: string
    #title: string
    #content: string
    #commentId: string
    #status: string

    /**
     * Set post id
     * @param {string} id
     * @return {this}
     */
    setId(id: string) {
        this.#id = id
        return this
    }

    /**
     * Get post id
     * @return {string}
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
     * Set comment id
     * @param {string} commentId
     * @return {this}
     */
    setCommentId(commentId: string) {
        this.#commentId = commentId
        return this
    }

    /**
     * Get post contentId
     * @return {string}
     */
    getCommentId() {
        return this.#commentId
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
     * Create post
     * @return {void}
     */
    async createPost() {
        await repository
            .createPost(Number(this.getId()), this.getTitle(), "", "")
    }

    /**
     * Create post comment
     * @return {void}
     */
    async createPostWithComment() {
        const comment = "{content: " + this.getContent() + ", comment_id: " + this.getCommentId() + "" +
            ", post_id: " + this.getId() + "}"
        this.handleCreatePostWithComment(await this.handlePostExists(this.getId()), comment)
    }


    /**
     * Check if post exist in database
     * @param {string} id
     * @return {boolean}
     */
    async handlePostExists(id: string) {
        return await repository.existsPost(Number(this.getId()))
    }

    /**
     * begin post create process
     * @param {boolean} postExists
     * @param {string} comment
     * @return {void}
     */
    async handleCreatePostWithComment(postExists: boolean, comment: string) {
        if (postExists) {
            const post = await repository
                .findById(Number(this.getId()))
            post.map(async (value: any) => {
                const currentId = value.id
                const currentTitle = value.title
                const currentComments = value.comments
                const currentStatus = value.status
                const allComments = currentComments + comment
                await repository
                    .deletePost(Number(this.getId()))
                await repository
                    .createPost(Number(currentId), currentTitle, allComments, currentStatus)
            })
        } else {
            await repository
                .createPost(Number(this.getId()), "", comment, this.getStatus())
        }
    }

    /**
     * Update posts status
     * @return {void}
     */
    async updatePostStatus() {
        await this.handleUpdatePostStatus(await this.handlePostExists(this.getId()))
    }

    /**
     * begin post status update process
     * @param {boolean} postExists
     * @return {void}
     */
    async handleUpdatePostStatus(postExists: boolean) {
        if (postExists) {
            await repository
                .updatePost(Number(this.getId()), this.getStatus())
        }
    }

    /**
     * Get approved posts from database
     * @return {object} approvedData
     */
    async getApprovedPosts() {
      return await repository.findByField("status", "approved")

    }
}
