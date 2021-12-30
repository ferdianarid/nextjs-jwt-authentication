import db from "../../../libs/db"
import bcrypt from "bcryptjs"

const handler = async(request, response) => {
    if (request.method !== "POST") response.status(405).end()

    const { name, email, password } = request.body

    const salt = bcrypt.genSaltSync(10)

    const passwordHash = bcrypt.hashSync(password, salt)

    const createUsers = await db("users").insert({
        name: name,
        email: email,
        password: passwordHash
    })

    const previewUsers = await db("users").where({ id: createUsers }).first()

    response.status(200)
    response.json({
        message: "Register successfully",
        data: previewUsers
    })

}

export default handler