import database from "../../../../library/connection"

const handler = async(request, response) => {
    if (request.method !== "DELETE") response.status(405).end()

    const { id } = request.query

    const deletePost = await database("posts").where({ id }).del()

    response.status(200)
    response.json({
        message: `Post with ID ${ id } successfully deleted`
    })
}

export default handler