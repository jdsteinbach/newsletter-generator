const pocket = require('./pocket')

exports.handler = async (event, context) => {
  const { body, httpMethod } = event

  const { accessToken, requestToken } = JSON.parse(body)

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
    pocket.setAccessToken(accessToken)
    pocket.setRequestToken(requestToken)

    const links = await pocket.getArticles({
      count: '5',
      detailType: 'complete',
      sort: 'oldest',
      state: 'unread',
      tag: 'link'
    })
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
