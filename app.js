var http = require("http");
var fs = require("fs");
var path = require("path");

var server = http.createServer((req, res) => {
    var fileName = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
    var ext = path.extname(fileName);
    var contentType = "text/html";

    switch (ext) {
        case ".js":
            contentType = "text/js";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".jpg":
            contentType = "image/jpeg";
            break;
        case ".jpg":
            contentType = "image/png";
            break;
    }

    fs.readFile(fileName, (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                fs.readFile(path.join(__dirname, "404.html"), (err, data) => {
                    res.writeHead(200, { "contentType": "text/html" });
                    res.end(data, 'utf8');
                });
            } else {
                res.writeHead(500);
                res.end(`sever error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'contentType': contentType });
            res.end(data, 'utf8');
        }
    });
});

server.listen(5000);