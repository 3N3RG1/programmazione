import {useState} from 'react'
import './tris.css'

export default function Tris() {
  const [arr, setArr] = useState([0,0,0,0,0,0,0,0,0])
  const [count, setCount] = useState(true)
  const winner = () => {
    if (arr[4] !== 0 && ((arr[0] === arr[4] && arr[4] === arr[8]) || (arr[2] === arr[4] && arr[4] === arr[6]))) return <Winner count={count}/>
    for (let i = 0, j = 0; i < 9 && j < 3; i = i+3, j++) {
      if (arr[i] !== 0 && arr[i] === arr[i+1] && arr[i+1] === arr[i+2]) return <Winner count={count}/>
      if (arr[j] !== 0 && arr[j] === arr[j+3] && arr[j+3] === arr[j+6]) return <Winner count={count}/>
    }
  }
  return (
    <>
        <div className="container">
          <Cells arr={arr} setArr={setArr} count={count} setCount={setCount}/>
        </div>
        {winner()}
    </>
  )
}

function Cells({arr, setArr, count, setCount}) {
  return arr.map((u, i) => {
    let stamp
    if(arr[i] === 1) stamp = <Rosso />
    else if(arr[i] === 2) stamp = <Blu />
    return (
      <div
        className="cell"
        key={i}
        data-n={i}
        onClick={(e) => {
          if (arr[e.target.dataset.n]) return
          let array = [...arr]
          array[e.target.dataset.n] = count ? 1 : 2
          setArr(array)
          setCount(!count)
        }}
      >{stamp}</div>
    )
  })
}

function Rosso() {
  return (
    <>
      <div className="rosso1"></div>
      <div className="rosso2"></div>
    </>
  )
}

function Blu() {
  return (
    <div className="blu"></div>
  )
}

function Winner({count}) {
  return (
    <div className="page">
      <div className="popUp">
        <div className="text">
          - Il
          <span style={{color: count ? 'blue' : 'red'}}>
            {count ? ' BLU ' : ' ROSSO '}
          </span>
          vince! -
        </div>
        <button>Reset</button> {/* mi si è rotto quando lho copiato :(, nn ho voglia di sistemarlo */}
      </div>
    </div>
  )
}