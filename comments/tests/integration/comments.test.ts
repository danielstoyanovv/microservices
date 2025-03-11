describe("Comments microservice integration tests",  function() {
    const POSTS_URL = "http://localhost:4000/posts"

    test("Test create comment", async function() {
        // Step 1 - Create a new post, then we can easily create new comments for it
        const post = {
            title: "My new post"
        }
        const response = await fetch(POSTS_URL, {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = response.json()
        if (response.ok) {
            expect(response.status).toBe(201);
            json.then(async result => {
                expect(result.status).toEqual("success");
                const comment = {
                    content: "My new comment"
                }
                // Step 2 - Create the new comment using the new created post id in the url
                const commentsUrl = `http://localhost:4001/posts/${result.data.id}/comments`
                const responseComment = await fetch(commentsUrl, {
                    method: "POST",
                    body: JSON.stringify(comment),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (responseComment.ok) {
                    expect(responseComment.status).toBe(201);
                }
            })
        }
    });
    test("Test comments list page", async function() {

        // Step 1 - Create a new post
        const post = {
            title: "My new post again"
        }
        const response = await fetch(POSTS_URL, {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = response.json()
        if (response.ok) {
            expect(response.status).toBe(201);
            json.then(async result => {
                expect(result.status).toEqual("success");
                const comment = {
                    content: "My new comment"
                }
                // Step 2 - use the new created post to get it's comments
                const commentsUrl = `http://localhost:4001/posts/${result.data.id}/comments`
                const responseComment = await fetch(commentsUrl, {
                    method: "GET"
                })
                if (responseComment.ok) {
                    expect(responseComment.status).toBe(200);
                }
            })
        }

    });

});