import db from "../../../../libs/db"

const handler = async(request, response) => {
    if (request.method !== "DELETE") response.status(405).end()

    const { id } = request.query

    const deleteUsers = await db("users").where({ id }).del()

    response.status(200)
    response.json({
        message: `Users with ID ${ id } successfully deleted`
    })
}

export default handler