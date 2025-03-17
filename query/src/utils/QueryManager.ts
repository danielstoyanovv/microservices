"use strict";

import database from "../config/database";
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
        await database.query('INSERT INTO posts(id, title) VALUES ($1, $2) '
            , [this.getId(), this.getTitle()])
    }

    /**
     * Create post comment
     * @return {void}
     */
    async createComment() {
        const comment = "{content: " + this.getContent() + ", comment_id: " + this.getCommentId() + "" +
            ", post_id: " + this.getId() + "}"
        const postExists = this.handlePostExists(this.getId())
        postExists.then(result => {
            this.handlePostCreate(result, comment)
        })
    }


    /**
     * Check if post exist in database
     * @return {boolean}
     */
    async handlePostExists(id: string) {
        const postExistsDatabase = await database
            .query('SELECT id FROM posts WHERE id= ($1) '
                , [id])
        if (postExistsDatabase.rowCount == 1) {
            return true
        }
        return false
    }

    /**
     * begin post create process
     * @return {void}
     */
    async handlePostCreate(postExists: boolean, comment: string) {
        if (postExists == true) {
            const postData = await database
                .query('SELECT id, title, comments, status FROM posts WHERE id= ($1) '
                    , [this.getId()])
            const post = postData.rows
            post.map(async (value: any) => {
                const currentId = value.id
                const currentTitle = value.title
                const currentComments = value.comments
                const currentStatus = value.status
                const allComments = currentComments + comment
                await database.query('DELETE FROM posts WHERE id= ($1) '
                    , [this.getId()])
                await database.query('INSERT INTO posts(id, title, comments, status) ' +
                    'VALUES ($1, $2, $3, $4) '
                    , [currentId, currentTitle, allComments, currentStatus])
            })
        } else {
            await database.query('INSERT INTO posts(id, comments, status) ' +
                'VALUES ($1, $2, $3) '
                , [this.getId(), comment, this.getStatus()])
        }
    }
}
