const express = require("express");
const nedb = require("nedb-promise");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({origin: "*"}));

const accountsDB = new nedb({filename: "accounts.db", autoload: true});

app.post("/login", async (request, response) => {
    const account = request.body;
    accountsDB.insert(account);
    response.json(account);
});

app.post("/register", async (request, response) => {
    const account = request.body;
    accountsDB.insert(account);
    response.json(account);
});

app.listen(port, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", port);
});