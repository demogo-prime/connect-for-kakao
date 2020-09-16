
var AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-northeast-1' });
var ddb = new AWS.DynamoDB.DocumentClient();
var tableName = "SampleUserData";

exports.handler =  function(event, context, callback) {

    console.log(JSON.stringify(event));
    
    // Logging customer to DynamoDB
    var channel = event["Details"]["ContactData"]["Channel"];
    var voiceInc = (channel === "VOICE") ? 1 : 0;
    var chatInc = (channel === "CHAT") ? 1 : 0;
    var contactId = event["Details"]["ContactData"]["ContactId"];
    var customerPhoneNumber = event["Details"]["ContactData"]["CustomerEndpoint"]["Address"];
    var currentDate = new Date();
    var dateTime = currentDate.toLocaleString();

    var wParam = {
        TableName: tableName,
        Key: {
            "PhoneNumber": customerPhoneNumber
        },
        UpdateExpression: "SET contactId=:i, voiceCount=if_not_exists(voiceCount, :v)+:vinc, chatCount=if_not_exists(chatCount, :c)+:cinc, lastDate=:t",
        ExpressionAttributeValues: {
            ":i": contactId,
            ":v": 0,
            ":vinc": voiceInc,
            ":c": 0,
            ":cinc": 0,
            ":t": dateTime
        },
        ReturnValues: "UPDATED_NEW"
    };
    
    ddb.update(wParam, function(err, data) {
        if (err) {
            console.log("Error - ", err);
        } else {
            console.log("Success - ", data);
        }
    });

    // TODO implement
    var resultMap = {
        ContactId:contactId,
        PhoneNumber:customerPhoneNumber,
        Channel:channel
    };
    callback(null, resultMap);
}