const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config({ path: "./config.env" })
const app = require("./app");
const port = process.env.PORT;
mongoose.connect(process.env.CONN_STR, { useNewUrlParser: true })
    .then(conn => {
        // console.log(conn);
        console.log("db is connected");
    }).catch(err => {
        console.log(err)
    })


app.listen(port, function () {
    console.log(`server is running on port ${port}`)
})