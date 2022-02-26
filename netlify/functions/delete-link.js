const pocket = require('./pocket')

exports.handler = async (event, context) => {
  const { httpMethod } = event
  console.log({ httpMethod })

  // validate method
  // validate body

  try {
    const links = pocket.modifyArticles()
      .then(r => r)
      .catch(e => {
        throw new Error(e)
      })

    return {
      statusCode: 200,
      body: JSON.stringify(links)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
