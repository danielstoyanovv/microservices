export interface PostRepositoryInterface {
    /**
     *
     * @param id
     * @param title
     * @param comments
     * @param status
     * @return {void}
     */
    createPost(id: number, title: string, comments: string, status: string): Promise<void>;

    /**
     * Delete post
     * @param id
     * @return {void}
     */
    deletePost(id: number): Promise<void>;

    /**
     * Update post status
     * @param id
     * @param data
     * @return {void}
     */
    updatePost(id: number, data: string): Promise<void>;

    /**
     * Find post
     * @param id
     * @return {object}
     */
    findById(id: number): Promise<any>;

    /**
     *
     * @param id
     * @return {boolean}
     */
    existsPost(id: number): Promise<boolean>;

    /**
     * Find posts by specified field and value
     * @param field
     * @param value
     * @return {object}
     */
    findByField(field: string, value: string): Promise<any>;
}