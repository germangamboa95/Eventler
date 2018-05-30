const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.GOOG_CLIENT


const client = new OAuth2Client(CLIENT_ID);


const verify = async (token) => {

    
  try {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    return { payload, userid };

  } catch (error) {

      return error.message
  }  

}


module.exports = verify


