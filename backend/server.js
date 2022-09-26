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
    credentials.images = [];
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

app.post("/fotografen", async (request, response) => {
    const credentials = request.body;
    const usernameExists = await accountsDB.find({ username: credentials.username });

    if(usernameExists.length > 0) {
        let id = usernameExists[0]._id;
        console.log(id);
        accountsDB.update(
            {_id: id},
            {$push: {images: credentials.image}})
    }
    response.json(usernameExists);
})

app.listen(port, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", port);
});