import { useState, useEffect } from 'react';
import './toDoList.css'

export default function Todolist() {
  const [list, setList] = useState([])
  const [checklist, setChecklist] = useState([])
  useEffect(() => {
    async function listItems() {
      let res = await fetch('https://jsonplaceholder.typicode.com/todos')
      let json = await res.json()
      setList(json)
    }
    listItems()
  }, [])

  return (
    <div className="agenda">

      <div className="check">
        <div className="title">Unchecked :</div>
        <ul>
          {list.map((el, i) => {
            if(i >= 10) return
            return (
              <li key={i}>
                <input
                  type="checkbox"
                  onChange={() => {
                    let array1 = [...list]
                    let array2 = [...checklist]
                    array1.splice(i, 1)
                    array2.unshift(el)
                    setList(array1)
                    setChecklist(array2)
                  }}/>
                <span>{el.title}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="check">
        <div className="title">Checked :</div>
        <ul>
          {checklist.map((el, i) => {
            return (
              <li key={i}>
                <input
                type="checkbox"
                checked
                onChange={() => {
                  let array1 = [...checklist]
                  let array2 = [...list]
                  array1.splice(i, 1)
                  array2.unshift(el)
                  setList(array2)
                  setChecklist(array1)
                }}/>
                <span>{el.title}</span>
              </li>
            )
          })}
        </ul>
      </div>

    </div>
  )
}