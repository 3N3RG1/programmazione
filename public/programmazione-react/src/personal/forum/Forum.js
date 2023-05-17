import { useState, useEffect } from 'react';
import Navbar from './Navbar'
import { Routes, Route } from 'react-router-dom';
import Post1 from './Post1';
import Post2 from './Post2';
import Post3 from './Post3';
// import Post4 from './Post4';
// import Post5 from './Post5';
// import Post6 from './Post6';
// import Post7 from './Post7';
// import Post8 from './Post8';
// import Post9 from './Post9';
// import Post10 from './Post10';
import Aside from './Aside';

import './forum.css'

export default function Forum() {
    const [posts, setPosts] = useState([{}]) // array di oggetti
    const [comments, setComments] = useState([[]]) // array di array di oggetti
    
    useEffect(() => {
        (async () => {
            let res = await fetch('https://jsonplaceholder.typicode.com/posts')
            let json = await res.json() // let sliced = json.slice(0, 5)
            setPosts(json)
        })()
        // console.log(posts.length)
        // if(!posts.length > 1) call()
    }, [])

    useEffect(() => {
        (async () => {
            let comments = posts.map(async (el, i) => {
                let res = await fetch('https://jsonplaceholder.typicode.com/posts/'+(++i)+'/comments')
                let json = await res.json()
                return json
            })
            comments = await Promise.all(comments)
            setComments(comments)
        })()
    }, [posts])

    const [button, setButton] = useState('0') // al momento scollegato perchè va in conflitto con il ruoter

    return (
        <>
            <Navbar setButton={setButton}/>
            <Routes>
                <Route path="/" element={<Post1 posts={posts} comments={comments} button={button}/>} /> {/* potrei fare una pagina di defaul scritta forum*/}
                <Route path="/post1" element={<Post1 posts={posts} comments={comments} button={button}/>} />
                <Route path="/post2" element={<Post2 posts={posts} comments={comments} button={button}/>} />
                <Route path="/post3" element={<Post3 posts={posts} comments={comments} button={button}/>} />
                {/* <Route path="/post4" element={<Post4 posts={posts} comments={comments} />} />
                <Route path="/post5" element={<Post5 posts={posts} comments={comments} />} />
                <Route path="/post6" element={<Post6 posts={posts} comments={comments} />} />
                <Route path="/post7" element={<Post7 posts={posts} comments={comments} />} />
                <Route path="/post8" element={<Post8 posts={posts} comments={comments} />} />
                <Route path="/post9" element={<Post9 posts={posts} comments={comments} />} />
                <Route path="/post10" element={<Post10 posts={posts} comments={comments} />} /> */}
            </Routes>
            <Aside posts={posts}/>
        </>
    )
}