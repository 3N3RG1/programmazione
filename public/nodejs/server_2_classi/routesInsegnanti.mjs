import insegnanti from "./database/insegnanti.json" assert { type: 'json' }
import classi from "./database/classi.json" assert { type: 'json' }

export const cSezInsGet = (req, res) => {
    let insList = []
    for(let i = 0; i < insegnanti.length; i++) {
        for(let j = 0; j < insegnanti[i].classi.length; j++) {
            if(insegnanti[i].classi[j] === req.params.sezione) {
                insList.push(insegnanti[i].insegnante)
                break
            }
        }
    }
    insList.length > 0 ? res.send(insList) : res.status(404).end
}

export const cSezMatInsGet = (req, res) => {

    const set = new Set()
    for(let i = 0; i < classi.length; i++) {
        if(classi[i].sezione === req.params.sezione) {
            for(let j = 0; j < classi[i].materie.length; j++) {
                set.add(classi[i].materie[j])
            }
            break
        }
    }
    if(set.size === 0) return res.status(400).end
    
    let map = new Map()
    for(let i = 0; i < insegnanti.length; i++) {
        for(let j = 0; j < insegnanti[i].materieInsegnate.length; j++) {
            if(set.has(insegnanti[i].materieInsegnate[j])) {
                if(!map.has(insegnanti[i].materieInsegnate[j])) {
                    map.set(insegnanti[i].materieInsegnate[j], [insegnanti[i].insegnante])
                } else {
                    const arr = map.get(insegnanti[i].materieInsegnate[j])
                    arr.push(insegnanti[i].insegnante)
                    map.set(insegnanti[i].materieInsegnate[j], arr)
                }
            }
        }
    }

    const obj = { }
    map.forEach((v, k) => {
        obj[k] = v
    })
    res.send(obj)
}