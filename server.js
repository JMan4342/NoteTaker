const fs = require("fs/promises");

const express = require("express");
const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", function (req, res) {
  res.sendFile(__dirname + "/public/notes.html");
});

// GET request to /api/notes
app.get("/api/notes", async function (req, res) {
  try {
    const data = await fs.readFile("./db/db.json", "utf8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).end("Server failed");
  }
});

// POST request to /api/notes
app.post("/api/notes", async function (req, res) {
  const notes = req.body;
  try {
    const data = await fs.writeFile("./db/db.json", "utf8");
    res.json(JSON.parse(data));
    data.push(notes);
  } catch (err) {
    res.status(500).end("Server failed");
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
