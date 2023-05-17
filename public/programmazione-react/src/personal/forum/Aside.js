import { useState } from 'react';
import { Link } from 'react-router-dom';
import './aside.css';

export default function Aside({posts}) {
    const [input1, setInput1] = useState('')
    const [body, setBody] = useState([])

    function button() {
        let array = [], post
        for(let i = 1; i < 4; i++) {
            if(posts[i-1].body.includes(input1)) {
                post = '/post'+i
                array.push(<Link className="link" to={post}>Post {i}</Link>)
            }
        }
        return setBody(array)
    }
    
    return (
        <div className="aside">

            <button>chiudi</button>

            <div className="findBody">
                <div>cerca nei testi dei post:</div>
                <div>
                    <input onChange={(e) => setInput1(e.target.value)}/>
                    <button
                        onClick={button}
                    >Cerca</button>
                </div>
                <div>
                    {body.map((el, i) => <div key={i}>{el}</div>)}
                </div>
            </div>

        </div>
    )
}