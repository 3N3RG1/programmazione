// prendo il json con tutte le cc
// parto con un id = 1
// per ogni cc aggiungo in i-esima cc l'id
// aumento l'id di 1
// salvo nel file

let ccs = require('../case_cinematografiche.json')

let id = 1
ccs = ccs.map(cc => {
    cc.id = id
    id++
    return cc
})

require('fs').writeFileSync('../case_cinematografiche.json', JSON.stringify(ccs, null, '  '))