
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var tableName = "SampleUserData";

exports.handler =  function(event, context, callback) {
    
    console.log("Interact Lambda :" + JSON.stringify(event));
    var contactId = event["Details"]["ContactData"]["ContactId"];
    var customerPhoneNumber = event["Details"]["ContactData"]["CustomerEndpoint"]["Address"];
    
    console.log("D1");
    var rParam = {
        TableName: tableName,
        Key: {
            "PhoneNumber": {S: customerPhoneNumber}
        }
    };
    var response = {};
    ddb.getItem(rParam, function(err, data) {
        if (err) {
            console.log("Error : ", err);
            throw err;
        } else {
            console.log("Success : ", data);
            var dateli = data['Item']['lastDate']['S'].split(',');
            var mdy = dateli[0].split('/');
            var firstDate = mdy[2] + "년" + mdy[1] + "월" + mdy[0] + "일";
            var secondDate = dateli[1].indexOf("PM") > 0 ? "오후" : "오전"
            var thirdDate = dateli[1].replace(" PM", "").replace(" AM", "");
            response = {
                phoneNumber: JSON.stringify(data['Item']['phoneNumber']['S'].split("")),
                chatCount: data['Item']['chatCount'] ? data['Item']['chatCount']['N'] : 0,
                voiceCount: data['Item']['voiceCount'] ? data['Item']['voiceCount']['N'] : 1,
                lastDate: firstDate + " " + secondDate + thirdDate + "초"
            };
            
            callback(null, response);
        }
    });
}
