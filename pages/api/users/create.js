import db from "../../../libs/db"

const handler = async(request, response) => {
    if (request.method !== "POST") response.status(405).end()

    const { name, email } = request.body

    const createUsers = await db("users").insert({
        name: name,
        email: email
    })

    const usersCreated = await db("users").where("id", createUsers).first()

    response.status(200)
    response.json({
        message: "Users create successfully",
        data: usersCreated
    })
}

export default handler