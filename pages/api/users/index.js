import db from "../../../libs/db"

const handler = async(request, response) => {
    if (request.method !== "GET") response.status(405).end()

    const users = await db("users")

    response.status(200)
    response.json({
        message: "Successfully get data Users",
        data: users
    })
}

export default handler