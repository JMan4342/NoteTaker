const path =require("path");
const fs = require("fs/promises");

const express = require("express");
const app = express();

const PORT = 8080;

const noteList = [];
const dbFilePath = path.join(__dirname, "db/db.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


// HTML routes
// Index/home site
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Notes page
app.get("/notes", function (req, res) {
  res.sendFile(__dirname + "/public/notes.html");
});


// // GET request to /api/notes
app.get("/api/notes", async function (req, res) {
  try {
    const data = await fs.readFile("db/db.json", "utf8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).send("Server failed");
    console.log(err)
  }
});

// // POST request to /api/notes
app.post("/api/notes", async function (req, res) {
  const notes = req.body;
  try {
    const data = await fs.writeFile("db/db.json", "utf8");
    res.json(JSON.parse(data));
    data.push(notes);
  } catch (err) {
    res.status(500).send("Server failed");
  }
});

// GET - /api/notes
// app.get("/api/notes", function (req, res) {
//   fs.readFile("./db/db.json", "utf8").then((content) => {
//     const data = JSON.parse(content);
//     res.json(data);
//   });
//   });

// POST - /api/notes
// app.post("/api/notes", async function (req, res) {
//   const notes = req.body;
//   const content = await fs.writeFile("/db/db.json", "utf8");
//   const data = JSON.parse(content);
//   res.json(data)
//   data.push(title);
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);