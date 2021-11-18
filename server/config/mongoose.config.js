const mongoose = require("mongoose");

//Mongoose connect with the database
mongoose.connect("mongodb://localhost/dojo_social", {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
    .then(()=> console.log("Mongoose connection successful!"))
    .catch(err => console.log("Mongoose did not connect...check connection", err))
