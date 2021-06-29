const fs = require('fs');
const path = require('path');
const { env } = require('process');
let dirforallreports = '/Users/venkatasrinadhuni/Desktop/postmanCollection/all'
let url="";
let totalPass=0;
let totalFail=0;
let totalTime= 0;
const results = [];
const requests = [];
let info = {}
var files = fs.readdirSync(dirforallreports)
for(var file in files )
{
console.log(files[file])
const data = fs.readFileSync(path.join(dirforallreports,files[file]),'utf-8')
const jsonData = JSON.parse(data);

for(var envItem in jsonData.environment.values)
{
    if(jsonData.environment.values[envItem].key=="node_domain")
    {
        url=jsonData.environment.values[envItem].value;
        break;
    }
}

var urlpath="";
for (var key in jsonData.run.executions[1].item.request.url.path)
{
    urlpath=urlpath+'/'+jsonData.run.executions[1].item.request.url.path[key]
}
let fullUrl = url+urlpath

let startDate = new Date(jsonData.run.timings.started).toISOString("yyyy'-'MM'-'dd HH':'mm':'ss'Z'");

const items = jsonData.collection.item.length
let name = jsonData.collection.item[0].name
let id = jsonData.collection.item[0].id


for (var j = 0; j<jsonData.run.executions.length; j++)
{
var reqname = jsonData.run.executions[j].item.name
var reqId = jsonData.run.executions[j].item.id
let code = jsonData.run.executions[j].response.code
let status = jsonData.run.executions[j].response.status
respTime = jsonData.run.executions[j].response.responseTime
totalTime=totalTime+respTime;
jsonData.run.executions[j].assertions[0].assertion

var tests = {
}

var testPassFailCounts = {}

for(var i =0; i<jsonData.run.executions[j].assertions.length; i++)
{
tests[jsonData.run.executions[j].assertions[i].assertion] = (jsonData.run.executions[j].assertions[i].error == undefined ? true:false)
jsonData.run.executions[j].assertions[i].error == undefined ? 
testPassFailCounts[jsonData.run.executions[j].assertions[i].assertion]={"pass":1, "fail":0} : 
testPassFailCounts[jsonData.run.executions[j].assertions[i].assertion]={"pass":0,"fail":1}
jsonData.run.executions[j].assertions[i].error == undefined ? totalPass+=1: totalFail+=1;

}

requests.push({id: jsonData.run.executions[j].item.id, method: jsonData.run.executions[j].request.method})
results.push({
    "id": reqId,
    "name": reqname,
    "url": fullUrl,
    "time": respTime,
    "responseCode": {
        "code": code,
        "name":status
    },
    "tests": tests,
    "testPassFailCounts": testPassFailCounts,
    "times": [
        respTime
    ],
    "allTests": [
        tests
    ]
});

}

//write this only for first file
if (file==0)
{
info = 
    {
        "id": "dadfd20d-64ff-48a5-9f18-823578e369b3",
        "name": "WFI API Automation - Released",
        "timestamp":startDate,
        "collection_id": "be9fe43c-990b-42f9-90dd-5ffd93510450",
        "folder_id": "8d1c58d5-e222-443b-bac9-da4eb1ca7585",
        "environment_id": "309fa09b-e064-4a2a-8fd0-d0fd0f67b831",
        "totalPass": totalPass,
        "totalFail": totalFail
 }
}

info.totalPass=totalPass
info.totalFail=totalFail
//fs.unlinkSync(path.join(dirforallreports,files[file]))
}

let apicalls = 
 {
    "count": 1,
	"totalTime": totalTime,
	"collection" : {"requests" : requests}
 }
fs.writeFileSync("/Users/venkatasrinadhuni/Desktop/postmanCollection/mergedJson.json",JSON.stringify({info,results,apicalls},null,2))