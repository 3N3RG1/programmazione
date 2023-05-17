import { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbar({setButton}) {
    const [input, setInput] = useState('')

    return (
        <div className="navbar">

            <div className="links">
                <div>All posts</div>
                <div><Link className="link" to="/post1">Post 1</Link></div>
                <div><Link className="link" to="/post2">Post 2</Link></div>
                <div><Link className="link" to="/post3">Post 3</Link></div>
                <div><Link className="link" to="/post4">Post 4</Link></div>
                <div><Link className="link" to="/post5">Post 5</Link></div>
                <div><Link className="link" to="/post6">Post 6</Link></div>
                <div><Link className="link" to="/post7">Post 7</Link></div>
                <div><Link className="link" to="/post8">Post 8</Link></div>
                <div><Link className="link" to="/post9">Post 9</Link></div>
                <div><Link className="link" to="/post10">Post 10</Link></div>
            </div>

            {/* <div className="input">
                <div>Type a number between 1 and 100</div>
                <div>
                    <input
                        placeholder='1'
                        onChange={(e) => setInput(e.target.value)}
                    ></input>
                    <button onClick={() => setButton(input-1)}>Invio</button>
                </div>
            </div> */}

        </div>
    )
}