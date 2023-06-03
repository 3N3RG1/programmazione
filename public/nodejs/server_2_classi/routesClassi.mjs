import classi from "./database/classi.json" assert { type: 'json' }

export const cGet = (req, res) => {
    res.send(classi)
}

export const cSezGet = (req, res) => {
    for(let i = 0; i < classi.length; i++) {
        if(classi[i].sezione === req.params.sezione.toLowerCase()) {
            return res.send(classi[i])
        }
    }
    res.status(404).end
}

export const cSezAlGet = (req, res) => {
    for(let i = 0; i < classi.length; i++) {
        if(classi[i].sezione === req.params.sezione.toLowerCase()) {
            return res.send(classi[i].alunni)
        }
    }
    res.status(404).end
}

export const cSezMatGet = (req, res) => {
    for(let i = 0; i < classi.length; i++) {
        if(classi[i].sezione === req.params.sezione.toLowerCase()) {
            return res.send(classi[i].materie)
        }
    }
    res.status(404).end
}

export const cAlSezGet = (req, res) => {
    let alunno = req.params.alunno.split('-')
    const nome = alunno[0].replace(alunno[0].at(0), alunno[0].at(0).toUpperCase())
    const cognome = alunno[1].replace(alunno[1].at(0), alunno[1].at(0).toUpperCase())
    alunno = nome + ' ' + cognome

    const alSez = []
    for(let i = 0; i < classi.length; i++) {
        for(let j = 0; j < classi[i].alunni.length; j++) {
            if(classi[i].alunni[j] === alunno) {
                alSez.push(classi[i].sezione)
                break
            }
        }
    }
    alSez.length > 0 ? res.send(alSez) : res.status(404).end
}

export const cMatSezGet = (req, res) => {
    let materia = req.params.materia
    materia = materia.replace(materia.at(0), materia.at(0).toUpperCase())

    const matSez = []
    for(let i = 0; i < classi.length; i++) {
        for(let j = 0; j < classi[i].materie.length; j++) {
            if(classi[i].materie[j] === materia) {
                matSez.push(classi[i].sezione)
                break
            }
        }
    }
    matSez.length > 0 ? res.send(matSez) : res.status(404).end
}

export const cAlDel = (req, res) => {
    let alunno = req.params.alunno.split('-')
    const nome = alunno[0].replace(alunno[0].at(0), alunno[0].at(0).toUpperCase())
    const cognome = alunno[1].replace(alunno[1].at(0), alunno[1].at(0).toUpperCase())
    alunno = nome + ' ' + cognome

    for(let i = 0; i < classi.length; i++) {
        for(let j = 0; j < classi[i].alunni.length; j++) {
            if(classi[i].alunni[j] === alunno) {
                classi[i].alunni.splice(j, 1)
                return res.status(200).end
            }
        }
    }
    res.status(404).end
}

export const cSezPut = (req, res) => {
    for(let i = 0; i < classi.length; i++) {
        if(classi[i].sezione === req.params.sezione) {
            classi[i].alunni.push(...req.body)
            return res.status(200).end
        }
    }
    res.status(404).end
}

const NEXT_ID = classi
    .reduce((bigger, curr) => curr.id > bigger[0] ? [curr.id, curr.sezione] : bigger, [-1, "a"])
export const cPost = (req, res) => {
    let NEXT_SEZ = NEXT_ID[1].charCodeAt()
    NEXT_SEZ = String.fromCharCode(NEXT_SEZ+1)
    classi.push({id: ++NEXT_ID[0], sezione: NEXT_SEZ, ...req.body})
    res.status(200).end()
}