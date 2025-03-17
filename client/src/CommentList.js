import React from "react";

export default ({ comments }) => {

    if (comments) {
        const commentsAsArray = []
        const allData = comments.split("}")
        allData.map(comment => {
            if (comment.length > 0) {
                const data = comment.split(":")
                const contentData = data[1].split(",")
                const content = contentData[0]
                const commentData = data[2].split(",")
                const commentId = commentData[0]

                const commentResult = {
                    id: commentId,
                    content: content
                }
                commentsAsArray.push(commentResult)
            }
        })
        const renderedComments = commentsAsArray.map(comment => {
            return <li key={comment.id}>{comment.content}</li>
        })

        return <ul>
            {renderedComments}
        </ul>
    }
}