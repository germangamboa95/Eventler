const  twilio = require('twilio');

//  Twilio setup
const accountSid = 'AC464b317faef364574c54db6881e35e91'; 
const authToken =   process.env.twilio_key || '4863c240ebe8d276da0f7443e6d8c2d3'; 

const  client = new twilio(accountSid, authToken);

// Send texts with message. Array wrapped in promise.all.
const sendTexts = async (numbersArr, msg) => {
    return Promise.all(numbersArr.map( async item => {
        try {
            return await client.messages.create({
                body: msg,
                to: `+1${item}`,  // Text this number
                from: '+13212043039' // From a valid Twilio number
            });
            return await x;   
        } catch (error) {
            return error
        }
    }));
}


module.exports = sendTexts