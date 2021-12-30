const handler = (request, response) => {
    response.status(200)
    response.json({
        message: "Post create successfully"
    })
}

export default handler