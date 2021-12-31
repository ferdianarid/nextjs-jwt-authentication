import database from "../../../library/connection"

import jwt from "jsonwebtoken"

require("dotenv/config")
const SECRET_KEY = process.env.SECRET_KEY

const handler = async(request, response) => {
    const { authorization } = request.headers
    if (!authorization) response.status(401).end()

    const separatedAuth = authorization.split(' ')
    console.log(separatedAuth);

    // const [typeAuthentication, tokenAuthentication] = [separatedAuth[0], separatedAuth[1]]

    const typeAuthentication = authorization.split(" ")[0]
    const tokenAuthentication = authorization.split(" ")[1]

    console.log(`Type Auth : ${typeAuthentication}`);
    console.log(`Token Auth : ${tokenAuthentication}`);

    if (typeAuthentication !== "Bearer") response.status(401).end()

    const verifyTokens = jwt.verify(tokenAuthentication, SECRET_KEY)

    const { user, email } = verifyTokens
    console.log(user, email);

    if (request.method !== "GET") response.status(405).end()
    const posts = await database("posts")

    response.status(200)
    response.json({
        message: "Successfully get data Posts",
        data: posts
    })
}

export default handler