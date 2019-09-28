import axios from 'axios'
require('dotenv').config()

const SBB_ACCESS_TOKEN_API =
  'https://sso-int.sbb.ch/auth/realms/SBB_Public/protocol/openid-connect/token'

export async function getAccessToken() {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    },
  }

  const data = {
    grant_type: 'client_credentials',
    client_id: process.env.SBB_CLIENT_ID,
    client_secret: process.env.SBB_CLIENT_SECRET,
  }

  const encodeForm = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  axios
    .post(SBB_ACCESS_TOKEN_API, encodeForm(data), config)
    .then(result => {
      return result.data.accessToken
    })
    .catch(err => console.log(err))
}
