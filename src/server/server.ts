import * as fileSystem from 'fs';
import * as http from 'http';
import * as express from 'express';

var config = JSON.parse(fileSystem.readFileSync("package.json", ""));
var app = express();

var server = http.createServer(app);

var folderName = config.webServerConfig.folder;
var htmlFile = config.webServerConfig.htmlFile;
var portNumber = config.webServerConfig.port.web;

app.use(express.static(folderName, {
    index: `${htmlFile}.html`
}));

server.listen(portNumber, function () {
    console.log(`web server has started on port: ${portNumber}`)
});