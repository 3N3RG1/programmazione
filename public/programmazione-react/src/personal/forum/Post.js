import './post.css'

export default function Post({posts, comments, n}) { // qua mettere button e anche nel return al posto delle n

    return (
        <div className="forum">

            <div className="post">
                <div className="postId">{posts[n].id}</div>
                <div className="postUser">
                    <div className="postTitle">{posts[n].title}</div>
                    <div className="postBody">{posts[n].body}</div>
                </div>
            </div>

            <div className="comments">
                {comments[n].map((el, i) => (
                    <div key={i}>
                        <div>{el.name}</div>
                        <div>{el.body}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}
