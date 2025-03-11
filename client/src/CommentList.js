import React, { useState, useEffect } from "react";

export default ({ postId }) => {
    const [comments, setComments] = useState([])

    const fetchData = async () => {
        const commentsUrl = `http://localhost:4001/posts/${postId}/comments`
        const responseComment = await fetch(commentsUrl, {
            method: "GET"
        })
        if (responseComment.ok) {
            console.log(responseComment.status)
            const json = responseComment.json()
            json.then(async result => {
                setComments(result.data)
            })
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    })

    return <ul>
        {renderedComments}
    </ul>
}