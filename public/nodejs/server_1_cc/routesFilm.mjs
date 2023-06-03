import film from "./database/film.json" assert { type: 'json' }

export const ccFilmsGet = (req, res) => {  
    const filtered = film.filter(f => f.casaProduzione == req.params.id)
    res.send(filtered)
}

export const fGet = (req, res) => {
    res.send(film)
}