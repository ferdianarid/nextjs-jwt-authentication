import database from "../../../library/connection"
import bcrypt from "bcryptjs"

require("dotenv/config")

const SECRET_KEY = process.env.SECRET_KEY

import jwt from "jsonwebtoken"

const handler = async(request, response) => {
    if (request.method !== "POST") response.status(405).end()

    const { email, password } = request.body

    const checkUsers = await database("users").where({ email }).first()
    if (!checkUsers) response.status(401).end()

    const passwordValidated = await bcrypt.compare(password, checkUsers.password)

    const tokens = jwt.sign({
        id: checkUsers.id,
        name: checkUsers.name,
        email: checkUsers.email
    }, SECRET_KEY, {
        expiresIn: "7d"
    })


    // if (typeof window !== 'undefined') {
    //     window.localStorage.setItem('token', tokens)
    // }

    response.status(200)
    response.json({
        message: "Users available",
        data: checkUsers,
        token: tokens,
        passwordValidated: passwordValidated
    })
}

export default handler