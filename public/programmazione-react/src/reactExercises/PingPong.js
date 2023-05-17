import { useState } from "react";
import './pingPong.css'

export default function PingPong() {
    return (
        <>
            <Button />
            <Button2 />
        </>
    )
}

function Button() {
  let [output, setOutput] = useState('')
  return (
    <div className="contenitore">
      <div className="pingPong">
        <PingPongReal strPingPong="Ping" outPut={setOutput} />
        <PingPongReal strPingPong="Pong" outPut={setOutput} />
      </div>
      <div className="outPut">
        <div className="text">{output}</div>
      </div>
    </div>
  )
}

function PingPongReal({strPingPong, outPut}) {
  return (
      <button
        className="button"
        onClick={() => outPut(strPingPong.toUpperCase())}
      >{strPingPong}</button>
  )
}

function Button2() {
  let [output, setOutput] = useState('false')
  return (
    <div className="vaso">
      <PP outPut={output} setOutPut={setOutput} />
      <div className="outPut">
        <div className="text">{output}</div>
      </div>
    </div>
  )
}

function PP({outPut, setOutPut}) {
  let [boo, setBoo] = useState('true')
  return (
    <button className="button" id="bottone" onClick={() => {
      if(outPut === 'false') {
        setBoo('false')
        setOutPut('true')
      } else {
        setBoo('true')
        setOutPut('false')
      }
    }}>{boo}</button>
  )
}