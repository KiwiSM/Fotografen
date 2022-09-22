const express = require("express");
const nedb = require("nedb-promise");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(cors({origin: "*"}));

const accounts = new nedb({filename: "accounts.db", autoload: true});