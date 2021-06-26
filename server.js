const express = require("express");
const app = express();

const PORT = 8080;

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/public/notes.html");
});

// app.get("/assets/js/index.js", function (req, res) {
//     res.sendFile(__dirname + "/public/assets/js/index.js");
// });
// app.get("/assets/css/styles.css", function (req, res) {
//     res.sendFile(__dirname + "/public/assets/css/styles.css");
// });

// GET request to /api/notes

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());