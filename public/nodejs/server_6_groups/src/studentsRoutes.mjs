import students from "../db/students.json" assert { type: "json" }
import { fetchAll } from "../scripts/fetchAll.mjs"

const secretKey = "5555"

export const getGroupStudents = (req, res) => {
    if (req.headers.key == secretKey) {
        res.send(students)
    } else {
        res
            .status(404)
            .send({
                data: {},
                error: true,
                message: "Ritenta, sarai piú fortunato popi popi"
            })
    }
}

export const getAllStudents = async (req, res) => {
    let allStudents = await fetchAll()
    res.send(allStudents)
}

export const key = (req, res) => {
    res.send(req.headers.key)
}
