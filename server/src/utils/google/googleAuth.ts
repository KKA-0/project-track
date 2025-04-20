import axios from 'axios'

export const googleAuth = (google_auth_token: string) => {
    // console.log("in google login")
    const userInfo = axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${google_auth_token}`,
        },
      })
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return error;
    });
    return userInfo;
}