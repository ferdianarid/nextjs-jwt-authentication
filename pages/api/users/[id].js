import db from "../../../libs/db"

const handler = async(request, response) => {
    if (request.method !== "GET") response.status(405).end()

    const { id } = request.query

    const selectedUsers = await db("users").where({ id }).first()

    response.status(200)
    response.json({
        message: `Success get data users with ID ${ id }`,
        data: selectedUsers
    })
}

export default handler