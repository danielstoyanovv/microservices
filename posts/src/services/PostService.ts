"use strict";

import {PostRepository} from "../repositories/PostRepository";

const repository = new PostRepository()

export class PostService {
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
     * Create post
     * @return {void}
     */
    async createPost() {
        await repository
            .createPost(this.getId(), this.getTitle())
    }

    /**
     * get all posts from database
     * @return {object} posts
     */
    async getPosts() {
        return await repository
            .findAll()
    }
}