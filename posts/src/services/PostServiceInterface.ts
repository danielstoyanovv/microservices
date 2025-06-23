export interface PostServiceInterface {
    id: number;
    title: string;

    /**
     * Set post id
     * @param {number} id
     * @return {this}
     */
    setId(id: number): setId;

    /**
     * Get post id
     * @return {number}
     */
    getId(): any;

    /**
     * Set post title
     * @param {string} title
     * @return {string}
     */
    setTitle(title: string): setTitle;

    /**
     * Get post title
     * @return {string}
     */
    getTitle(): any;

    /**
     * Create post
     * @return {void}
     */
    createPost(): Promise<void>;

    /**
     * get all posts from database
     * @return {object} posts
     */
    getPosts(): Promise<any>;
}