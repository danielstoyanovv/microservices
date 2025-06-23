export interface CommentRepositoryInterface {
    /**
     * Create comment
     * @param id
     * @param postId
     * @param content
     * @param status
     * @return {void}
     */
    createComment(id: number, postId: string, content: string, status: string): Promise<void>;

    /**
     *
     * @param field
     * @param value
     * @return {object}
     */
    findByField(field: string, value: string): Promise<any>;
}
