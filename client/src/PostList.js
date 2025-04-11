import React, {useEffect, useState} from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const response = await fetch("http://posts.com/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        const json = response.json()
        if (response.ok) {
            json.then(result => {

                setPosts(result.data)
            })
        }
    }

    const renderPosts =  Object.values(posts).map(post => {
        return (
            <div
                className="card"
                key={post.id}
            >
                <div
                    className="card-body"
                >
                    <h3>{post.title}</h3>
                    <p>{post.status}</p>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>

            </div>
        )
    })

    useEffect(() => {
        fetchPosts()
    }, []);

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderPosts}
    </div>
}