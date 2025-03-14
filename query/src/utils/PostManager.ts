"use strict";

import database from "../config/database";
export class PostManager {
    #id: string
    #title: string
    #content: string
    #commentId: string


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

    async createPost() {
        await database.query('INSERT INTO posts(id, title) VALUES ($1, $2) '
            , [this.getId(), this.getTitle()])
    }
    async createComment() {
        const checkIfPostExistsInDatabase = await database
            .query('SELECT id, title, comments FROM posts WHERE id= ($1) '
                , [this.getId()])
        const comment = "{content: " + this.getContent() + ", comment_id: " + this.getCommentId() + "" +
            ", post_id: " + this.getId() + "}"
        const postsCommentsData = checkIfPostExistsInDatabase.rows
        if (checkIfPostExistsInDatabase.rowCount == 1) {
            postsCommentsData.map(async (value: any) => {
                const currentId = value.id
                const currentTitle = value.title
                const currentComments = value.comments
                const allComments = currentComments + comment
                await database.query('DELETE FROM posts WHERE id= ($1) '
                    , [this.getId()])
                await database.query('INSERT INTO posts(id, title, comments) ' +
                    'VALUES ($1, $2, $3) '
                    , [currentId, currentTitle, allComments])
            })
        } else {
            await database.query('INSERT INTO posts(id, comments) ' +
                'VALUES ($1, $2) '
                , [this.getId(), comment])
        }
    }
}
