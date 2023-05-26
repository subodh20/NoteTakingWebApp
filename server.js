if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const dbConnect = require("./config/connectToDB");
const Note = require("./models/note");

const app = express();
app.use(express.json);
dbConnect();

app.get("/", (req, res) => {
  res.send("Hello Wold");
});

app.post("/notes", async (req, res) => {
  //get the sent in data of request body
  const title = req.body.title;
  const body = req.body.body;
  //create a new note with it
  const note = await Note.create({
    title: title,
    body: body,
  });
  //respond with the new note
  res.json({ note: note });
});
app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
