import db from "../../../libs/db"

const handler = async(request, response) => {
    if (request.method !== "POST") response.status(405).end()

    console.log(request.body);

    const { title, content } = request.body

    const createPost = await db("posts").insert({
        title: title,
        content: content
    })

    const postCreated = await db("posts").where("id", createPost).first()

    response.status(200)
    response.json({
        message: "Post create successfully",
        data: postCreated
    })
}

export default handler