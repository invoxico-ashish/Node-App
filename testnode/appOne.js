const http = require("http");
const server = http.createServer(function (req, res) {
    res.end(`hello from Server`)
    console.log("A new Request recevied")
})

server.listen(5000, "192.168.1.15", function () {
    console.log(`server has started`)
})