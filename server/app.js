const express = require("express");
const { register, getAllScore, addScore, getMyScore } = require("./controllers/GlobalController");
const { authorization } = require("./middleware/auth");
const app = express();
const cors = require('cors')
const port = 3000;


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", register);

app.use(authorization)

app.get('/score', getAllScore)
app.post('/score', addScore)
app.get('/myscore', getMyScore)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
