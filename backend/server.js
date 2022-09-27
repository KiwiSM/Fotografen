const express = require("express");
const nedb = require("nedb-promise");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());
app.use(cors({origin: "*"}));

const accountsDB = new nedb({filename: "accounts.db", autoload: true});
const picturesDB = new nedb({filename: "pictures.db", autoload: true});

app.post("/login", async (request, response) => {
    const credentials = request.body;
    const resObj = {
        success: false,
    }

    const account = await accountsDB.find({username: credentials.username});
    if(account.length > 0) {
        if(credentials.password == account[0].password) {
            resObj.success = true; 
        } 
    }
    response.json(resObj);
});

app.post("/register", async (request, response) => {
    const credentials = request.body;
    const resObj = {
        success: true,
        usernameExists: false,
        emailExists: false
    }

    const usernameExists = await accountsDB.find({ username: credentials.username });
    const emailExists = await accountsDB.find({ email: credentials.email });

    if(usernameExists.length > 0) {
        resObj.usernameExists = true;
    }
    if(emailExists.length > 0) {
        resObj.emailExists = true;
    }
    if(resObj.usernameExists || resObj.emailExists) {
        resObj.success = false;
    } else {
        accountsDB.insert(credentials);
    }
    response.json(resObj)
});

app.post("/take-picture", async (request, response) => {
    const credentials = request.body;
    picturesDB.insert(credentials)
});

app.post("/fotografen", async (request, response) => {
    const credentials = request.body;
    const user = await accountsDB.find({ username: credentials.user });
    if(user.length > 0) {
        if(user[0].admin == true) {
            console.log("hej");
            const admin = await picturesDB.find({ admin: true})
            response.json(admin);
        } else {
            const usernameExists = await picturesDB.find({ username: credentials.user });
            response.json(usernameExists);
        }   
    }
});

app.delete("/images", async (request, response) => {
    const data = request.body;
    const deletePicture = await picturesDB.remove({
        image: data.picture.image
    });
    console.log(deletePicture, "deleted");
})

app.listen(port, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", port);
});