const express = require("express");
const connectDB = require("./config/db.config")
const wordRoute = require("./routes/post.word.route")
const app = express();
const cors = require("cors")

app.use(express.json());
app.use(cors())
connectDB()

app.use("/word", wordRoute)


app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server running"
  });
  console.log("homepage active");
});


app.listen(4000)