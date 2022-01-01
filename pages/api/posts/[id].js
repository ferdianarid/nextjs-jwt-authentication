import database from "../../../library/connection"
import authorizeToken from "../../../middlewares/AuthToken"

const handler = async(request, response) => {
    if (request.method !== "GET") response.status(405).end()

    const auth = await authorizeToken(request, response)
    console.log(auth);

    const { id } = request.query

    const selectedUsers = await database("posts").where({ id }).first()

    response.status(200)
    response.json({
        message: `Success get data with ID ${ id }`,
        data: selectedUsers
    })
}

export default handler