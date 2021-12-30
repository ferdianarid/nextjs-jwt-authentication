import db from "../../../libs/db"

const handler = async(request, response) => {
    if (request.method !== "GET") response.status(405).end()

    const posts = await db("posts")

    response.status(200)
    response.json({
        message: "Successfully get data Posts",
        data: posts
    })
}

export default handler