import database from "../../../library/connection"
import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken"

const handler = async(request, response) => {
    if (request.method !== "POST") response.status(405).end()

    const { email, password } = request.body

    const checkUsers = await database("users").where({ email }).first()

    if (!checkUsers) response.status(401).end()

    const passwordValidated = await bcrypt.compare(password, checkUsers.password)

    const tokens = jwt.sign({
        id: checkUsers.id,
        user: checkUsers.name,
        email: checkUsers.email
    }, "ferdianreni", {
        expiresIn: "7d"
    })

    response.status(200)
    response.json({
        message: "Users available",
        database: checkUsers,
        token: tokens,
        passwordValidated: passwordValidated
    })
}

export default handler