import database from "../../../../library/connection"

const handler = async(request, response) => {
    if (request.method !== "PUT") response.status(405).end()

    const { id } = request.query

    const { name, email } = request.body

    const updateUsers = await database("users").where({ id }).update({
        name: name,
        email: email
    })

    const previewUsers = await database("users").where({ id }).first()

    response.status(200)
    response.json({
        message: "Users update successfully",
        data: previewUsers
    })
}

export default handler