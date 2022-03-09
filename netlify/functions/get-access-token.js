const pocket = require('./pocket')

exports.handler = async (event, context) => {
  const { body, httpMethod } = event

  const { requestToken } = JSON.parse(body)

  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200
    }
  } else if (httpMethod !== 'POST') {
    return {
      statusCode: 401
    }
  }

  try {
    pocket.setRequestToken(requestToken)

    const response = await pocket.getAccessToken()
      .then(r => r)
      .catch(e => {
        throw new Error(e)
      })

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
