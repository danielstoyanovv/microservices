import React, {useEffect, useState} from "react";
import CommentsCreate from "./CommentsCreate";

export default () => {
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const response = await fetch("http://localhost:4000/posts", {
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
                const posts = []
                Object.keys(result.data).map(postKeys => {
                    const id = postKeys
                    Object.values(result.data).map(postValue => {
                        const title = postValue
                        const post = {
                            id: id,
                            title: title
                        };
                        posts.push(post)

                    })
                })
                setPosts(posts)
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
                    <CommentsCreate postId={post.id} />
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