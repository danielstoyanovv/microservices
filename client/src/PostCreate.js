import React, { useState } from "react";
import axios from "axios";

export default () => {
    const [title, setTitle] = useState("")

    const onsubmit = async (event) => {
        event.preventDefault()
        const data = {
            title: title
        }
        const response = await fetch("http://localhost:4000/posts", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"

            }
        })
        const json = response.json()
        if (response.ok) {
            json.then(result => {
                console.log(result)
            }).catch(errors => {
                console.log(errors)
            })
            console.log(response.status)
        }
    }

    return <div>
        <form onSubmit={onsubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="form-control"/>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}