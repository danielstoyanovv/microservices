export interface QueryServiceInterface {
    id: string;
    title: string;
    content: string;
    commentId: string;
    status: string;

    /**
     * Set post id
     * @param {string} id
     * @return {this}
     */
    setId(id: string): setId;

    /**
     * Get post id
     * @return {string}
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
     * Set post content
     * @param {string} content
     * @return {string}
     */
    setContent(content: string): setContent;

    /**
     * Get post content
     * @return {string}
     */
    getContent(): any;

    /**
     * Set comment id
     * @param {string} commentId
     * @return {this}
     */
    setCommentId(commentId: string): setCommentId;

    /**
     * Get post contentId
     * @return {string}
     */
    getCommentId(): any;

    /**
     * Set status
     * @param {string} status
     * @return {string}
     */
    setStatus(status: string): setStatus;

    /**
     * Get status
     * @return {string}
     */
    getStatus(): any;

    /**
     * Create post
     * @return {void}
     */
    createPost(): Promise<void>;

    /**
     * Create post comment
     * @return {void}
     */
    createPostWithComment(): Promise<void>;

    /**
     * Check if post exist in database
     * @param {string} id
     * @return {boolean}
     */
    handlePostExists(id: string): Promise<boolean>;

    /**
     * begin post create process
     * @param {boolean} postExists
     * @param {string} comment
     * @return {void}
     */
    handleCreatePostWithComment(postExists: boolean, comment: string): Promise<void>;

    /**
     * Update posts status
     * @return {void}
     */
    updatePostStatus(): Promise<void>;

    /**
     * begin post status update process
     * @param {boolean} postExists
     * @return {void}
     */
    handleUpdatePostStatus(postExists: boolean): Promise<void>;

    /**
     * Get approved posts from database
     * @return {object} approvedData
     */
    getApprovedPosts(): Promise<any>;
}