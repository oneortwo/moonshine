var connect = require('connect');
var fs = require('fs');

connect.createServer(
    connect.static(__dirname)
).listen(8080);

fs.writeFile("/tmp/test", "Hey there!", function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});

console.log("web server started");