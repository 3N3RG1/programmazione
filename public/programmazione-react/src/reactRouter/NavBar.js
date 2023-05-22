import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css'

export default function NavBar({slice}) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            let res = await fetch('https://jsonplaceholder.typicode.com/posts')
            let json = await res.json()
            let sliced = json.slice(slice[0], slice[1])
            setPosts(sliced)
        })()
    }, [])

    return (
        <div className="navBar">
            <NavLink to="/" className="link">Home</NavLink>
            <div>All posts</div>
            <div className="links">
                {posts.map((el, i) => (
                    <NavLink
                        to={'/post/'+(i+1)}
                        className="link"
                        key={i}
                    >Post {i+1}</NavLink>
                    )
                )}
            </div>
        </div>
    )
}