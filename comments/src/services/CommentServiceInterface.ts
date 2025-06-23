import {CommentRepositoryInterface} from "../repositories/CommentRepositoryInterface";

export interface CommentServiceInterface {
    id: number;
    postId: string;
    content: string;
    status: string;
    interface: CommentRepositoryInterface;

    /**
     * Set id
     * @param {number} id
     * @return {this}
     */
    setId(id: number): setId;

    /**
     * Get id
     * @return {number}
     */
    getId(): any;

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
     * Set post id
     * @param {string} postId
     * @return {this}
     */
    setPostId(postId: string): setPostId;

    /**
     * Get post id
     * @return {string}
     */
    getPostId(): any;

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
     * Create comment
     * @return {void}
     */
    createComment(): Promise<void>;

    /**
     * get all comments for a specified post
     * @return {object} comments
     */
    getPostComments(): Promise<any>;
}