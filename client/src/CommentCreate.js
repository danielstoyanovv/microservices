import React, { useState } from "react";

export default ({ postId }) => {
    const [content, setContent] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault()
        const commentsUrl =  `http://localhost:4001/posts/${postId}/comments`
        const comment = {
            content: content
        }
        const responseComment = await fetch(commentsUrl, {
            method: "POST",
            body: JSON.stringify(comment),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (responseComment.ok) {
            console.log(responseComment.status)
            setContent("")
        }

    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New comment</label>
                <input
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="form-control" />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}