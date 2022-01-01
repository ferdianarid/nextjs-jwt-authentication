import jwt from "jsonwebtoken"

require("dotenv/config")
const SECRET_KEY = process.env.SECRET_KEY

const authorizeToken = (request, response) => {
    return new Promise((resolve, reject) => {
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

        return jwt.verify(tokenAuthentication, SECRET_KEY, function(error, decoded) {
            if (error) response.status(401).end()
            return resolve(decoded)
        })
    })
}

export default authorizeToken