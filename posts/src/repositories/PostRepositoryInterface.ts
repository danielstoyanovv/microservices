export interface PostRepositoryInterface {
    /**
     * create post
     * @param id
     * @param title
     * @return {void}
     */
    createPost(id: number, title: string): Promise<void>;

    /**
     * Get all posts
     */
    findAll(): Promise<any>;
}