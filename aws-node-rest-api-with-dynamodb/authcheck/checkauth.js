'use strict';

const params = {
    region: 'eu-west-2',  // required
    userPoolId: 'eu-west-2_7bF7mD9tt', // required
    debug: true // optional parameter to show console logs
};

//optional claims examples
// const claims = {
//     aud: '<your-app-client-id>',
//     email_verified: true,
//     auth_time: time => time <= 1524588564,
//     'cognito:groups': groups => groups.includes('Admins')
// }

const Verifier = require('verify-cognito-token');
const verifier = new Verifier(params);

module.exports.checkauth = (event, context, callback) => {

    let thetoken = event.pathParameters.id;

    if (verifier.verify(thetoken) === true){
        // create a response
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
            body: 'User is authenticated'
        };
        callback(null, response);
    } else {
        // create a response
        const response = {
            statusCode: 401,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
            },
            body: 'Authentication failed',
        };
        callback(null, response);
    }
};