import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './aside.css'

export default function Aside({slice}) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const [arrayTitle, setArrayTitle] = useState([])
    const [arrayBody, setArrayBody] = useState([])

    function searchTitle() {
        if(title === '' || title === ' ') return setArrayTitle([])
        let array = []
        for(let i = 0; i < slice[1]; i++)
            if(posts[i].title.includes(title))
                array.push(posts[i].id)
        return setArrayTitle(array)
    }

    function searchBody() {
        if(body === '' || body === ' ') return setArrayBody([])
        let array = []
        for(let i = 0; i < slice[1]; i++)
            if(posts[i].body.includes(body))
                array.push(posts[i].id)
        return setArrayBody(array)
    }
    
    const [posts, setPosts] = useState([])  // devo togliere
    useEffect(() => {
        (async () => {
            let res = await fetch('https://jsonplaceholder.typicode.com/posts')
            let json = await res.json()
            let sliced = json.slice(slice[0], slice[1])
            setPosts(sliced)
        })()
    }, [])
    
    return (
        <>
            <button className="open">⮜ Open</button>

            <div className="aside">
                <button className="close">Close ⮞</button>
                <Search between="Titles" value={title} setTitleBody={setTitle} search={searchTitle} array={arrayTitle} setArray={setArrayTitle}/>
                <Search between="Bodies" value={body} setTitleBody={setBody} search={searchBody} array={arrayBody} setArray={setArrayBody}/>
            </div>
        </>
    )
}

function Search({between, value, setTitleBody, search, array, setArray}) {
    return (
        <div className="search">
            <div>Search between {between}:</div>
            <div className="asideElement">
                <input className="asideInput" value={value} onChange={(e) => setTitleBody(e.target.value)}/>
                <button
                    className="asideButton"
                    onClick={() => {
                        search()
                    }}
                >search</button>
            </div>
            <div className="asideLinks">
                {array.map((el, i) => 
                    <NavLink
                        className="asideLink"
                        onClick={() => {
                            setArray([])
                            setTitleBody('')}
                        }
                        to={'/post/'+el}
                        key={i}>
                    Post {el}</NavLink>)}
            </div>
        </div>
    )
}