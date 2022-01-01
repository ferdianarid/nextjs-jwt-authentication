import database from "../../../library/connection"
import authorizeToken from "../../../middlewares/AuthToken"

const handler = async(request, response) => {
    if (request.method !== "GET") response.status(405).end()

    const auth = await authorizeToken(request, response)
    console.log(auth);

    const posts = await database("posts")

    response.status(200)
    response.json({
        message: "Successfully get data Posts",
        data: posts
    })
}

export default handler