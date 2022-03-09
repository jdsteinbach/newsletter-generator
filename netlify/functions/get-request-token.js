const pocket = require('./pocket')

exports.handler = async (event, context) => {
  const { httpMethod } = event

  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200
    }
  } else if (httpMethod !== 'GET') {
    return {
      statusCode: 401
    }
  }

  try {
    const requestToken = await pocket.getRequestToken()
      .then(r => r)
      .catch(e => {
        throw new Error(e)
      })

    return {
      statusCode: 200,
      body: JSON.stringify({ code: requestToken })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
