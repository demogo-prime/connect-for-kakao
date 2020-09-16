const request = require('request');
const querystring = require('querystring');

const TABLE = "SampleUserData";
const ACCESS_TOKEN = "Bearer " + process.env.KAKAO_TOKEN;
const URL="https://kapi.kakao.com/v2/api/talk/memo/send";

 
exports.handler =  function(event, context, callback) {

    const resultMap = {"Name":"CustomerName","Address":"1234 Main Road","CallerType":"Patient"};
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": ACCESS_TOKEN
    }
    const response = {
      isBase64Encoded: false,
      headers: {"Content-Type": "application/json"}
    };

    request(
        {
            url: "https://kapi.kakao.com/v2/api/talk/memo/send?template_id=36292",
            method: "POST",
            json: true,
            headers: headers
        }, 
        function (err, res, body) {
            if (err) {
                console.dir(err)
                response.body = JSON.stringify(res.body);
                resultMap.statusCode = 500;
                callback(Error(err))
            }
            resultMap.statusCode = 200;
            console.log( JSON.stringify(res.body));
            response.body = JSON.stringify(res.body);
            callback(null, resultMap)
        }
    )
    
    return resultMap;
}