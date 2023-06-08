import axios from "axios"

const endpoints = [
    {
        url: "https://7758-2001-b07-a9a-89a8-fc69-90ae-c7c4-8dbc.ngrok-free.app/digitazon/2023/02/group/1/students",
        key: "5555"
    },
    {
        url: "https://b6a4-37-162-141-71.ngrok-free.app/digitazon/2023/02/group/2/students",
        key: "0876"
    },
    {
        url: "https://878f-151-33-19-106.ngrok-free.app/digitazon/2023/02/group/3/students",
        key: "2023"
    },
    {
        url: "https://5f00-212-24-20-117.eu.ngrok.io/digitazon/2023/02/group/4/students",
        key: "0020"
    }
]

export const fetchAll = () => {
    let students = axios
        .all(
            endpoints.map((endpoint) =>
                axios.get(endpoint.url, { headers: { key: endpoint.key } })
            )
        )
        .then(
            axios.spread((...responses) => {
                let allResponses = responses.map((response) => response.data);
                return allResponses.flat()
            })
        )
    return students
}