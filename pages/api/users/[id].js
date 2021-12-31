import database from "../../../library/connection"

const handler = async(request, response) => {
    if (request.method !== "GET") response.status(405).end()

    const { id } = request.query

    const selectedUsers = await database("users").where({ id }).first()

    response.status(200)
    response.json({
        message: `Success get data users with ID ${ id }`,
        data: selectedUsers
    })
}

export default handler