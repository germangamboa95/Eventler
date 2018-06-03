const  twilio = require('twilio');


const accountSid = 'AC464b317faef364574c54db6881e35e91'; // Your Account SID from www.twilio.com/console
const authToken =   process.env.twilio_key;   // Your Auth Token from www.twilio.com/console

const  client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+14077449871',  // Text this number
    from: '+13212043039' // From a valid Twilio number
})
.then((message) => console.log(message.sid));


