import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './post.css'

export default function Post({slice}) {
    let { n } = useParams()
    const [post, setPost] = useState({})
    const [comment, setComment] = useState([])
    
    useEffect(() => {
        (async () => {
            let res = await fetch('https://jsonplaceholder.typicode.com/posts/'+n)
            let json = await res.json()
            setPost(json)
            res = await fetch('https://jsonplaceholder.typicode.com/posts/'+n+'/comments')
            json = await res.json()
            setComment(json)
        })()
    }, [n])

    return (
        n > slice[0] && n < slice[1]+1 ? (
            <div className="forum">

                <div className="post">
                    <div className="postId">{post.id}</div>
                    <div className="postUser">
                        <div className="postTitle">{post.title}</div>
                        <div className="postBody">{post.body}</div>
                    </div>
                </div>

                <div className="comments">
                    {comment.map((el, i) => (
                        <div className="comment" key={i}>
                            <div className="commentEmail">{el.email}</div>
                            <div className="commentBody">{el.body}</div>
                        </div>
                    ))}
                </div>

            </div>
        ) : (
            <div>non esiste alcun post con il seguente id: {n}</div>
        )
    )
}