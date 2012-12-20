var connect = require('connect');
var fs = require('fs');

// web server starts here
connect.createServer(
    connect.static(__dirname)
).listen(8080);
// ...and ends here...

// this part is only to test the file writing :)
fs.writeFile("/tmp/test", "Hey there!", function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});

console.log("web server started at http://localhost:8080");