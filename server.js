const fs = require("fs/promises");

const { nanoid } = require("nanoid");
const id = nanoid();

const express = require("express");
const app = express();

const PORT = 8080;

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
    console.log(err);
  }
});

// // POST request to /api/notes
app.post("/api/notes", async function (req, res) {
  const notes = req.body;
  notes.id = nanoid();
  try {
    // Read from file
    let data = await fs.readFile("db/db.json", "utf8");
    // Parse data from file
    data = JSON.parse(data);
    // Add to our notes array
    data.push(notes);
    // Write to file with new JSON string
    await fs.writeFile("db/db.json", JSON.stringify(data));
    // Respond to client/front end
    res.json(data);
  } catch (err) {
    res.status(500).send("Server failed");
  }
});

// View saved tasks
// app.post(`/api/notes/${id}`, async function (req, res) {
//   try {
//     // Read from file
//     let data = await fs.readFile("db/db.json", "utf8");
//     // Parse data from file
//     data = JSON.parse(data);
//     // Add to our notes array
//     data.push(notes);
//     // Write to file with new JSON string
//     await fs.writeFile("db/db.json", JSON.stringify(data));
//     // Respond to client/front end
//     res.json(data);
//   } catch (err) {
//     res.status(500).send("Server failed");
//   }
// });

// Delete saved tasks
app.delete(`/api/notes/:id`, async function (req, res) {
  const id = req.params.id;
  console.log("Hello", id);
  // const notes = req.body;
  // const id = req.params.id;
  try {
    // Read from file
    let data = await fs.readFile("db/db.json", "utf8");
    // Parse data from file
    data = JSON.parse(data);
    // Filter notes array
    data = data.filter(function () {
      return data.id !== id;
    }
    );
    // Write to file with new JSON string
    await fs.writeFile("db/db.json", JSON.stringify(data));
    // Respond to client/front end
    res.json(data);
  } catch (err) {
    res.status(500).send("Server failed");
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
