const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer")
const helmet = require("helmet");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
const port = 8000;

dotenv.config();
//Make sure this line is close to the top. Above routes
app.use(cors())
app.use(express.json(), express.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("common"));


require("./server/config/mongoose.config")
require("./server/routes/user.route")(app)
require("./server/routes/auth.route")(app)
require("./server/routes/post.route")(app)// dont forget to pass the app


// use path to indicate directory for images
app.use("/images", express.static(path.join(__dirname, "public/images")));
// multer only for trying to upload images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});




app.listen(port, () => console.log(`Running on port ${port}!!`));