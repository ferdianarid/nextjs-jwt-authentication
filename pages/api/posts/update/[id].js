import database from "../../../../library/connection"
import authorizeToken from "../../../../middlewares/AuthToken"

const handler = async(request, response) => {
    if (request.method !== "PUT") response.status(405).end()

    const auth = await authorizeToken(request, response)
    console.log(auth);

    const { id } = request.query

    const { title, content } = request.body

    const updatePosts = await database("posts").where({ id }).update({
        title: title,
        content: content
    })

    const postPreview = await database("posts").where({ id }).first()

    response.status(200)
    response.json({
        message: "Data Posts successfully updated",
        data: postPreview
    })
}

export default handler