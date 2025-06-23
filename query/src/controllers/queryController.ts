"use strict";

import {QueryService} from "../services/QueryService"
import {PostRepository} from "../repositories/PostRepository";

const service = new QueryService(new PostRepository)
export const handleEvent = (type: any, data:any) => {
    if (type === "PostCreated") {
        const {id, title} = data
        service
            .setId(id)
            .setTitle(title)
            .createPost()
    }

    if (type === "CommentCreated") {
        const {id, content, postId, status} = data
        service
            .setId(postId)
            .setCommentId(id)
            .setContent(content)
            .setStatus(status)
            .createPostWithComment()
    }

    if (type === "CommentUpdated") {
        const {id, status, postId, content} = data
        service.setId(postId)
            .setCommentId(id)
            .setContent(content)
            .setStatus(status)
            .updatePostStatus()
    }
}