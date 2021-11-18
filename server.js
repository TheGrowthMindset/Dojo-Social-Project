const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors")

const app = express();
const port = 8000;

//Make sure this line is close to the top. Above routes
app.use(cors())
app.use(express.json(), express.urlencoded({extended:true}));

require("./server/config/mongoose.config")
require("./server/routes/user.route")(app)
require("./server/routes/auth.route")(app)
require("./server/routes/post.route")(app)// dont forget to pass the app


app.listen(port, () => console.log(`Running on port ${port}!!`));