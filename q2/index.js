const express = require("express");
const session = require("express-session");
const path = require("path");

const port = 3000;

const app = express();

app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "salt for cookie signing",
  })
);

app.use(express.urlencoded({ extended: false }));

app.use("/css", express.static(path.join(__dirname, "css")));

const date = new Date();
const currentHr = 20;
const cssFile =
  currentHr > 6 && currentHr < 18 ? "css/day.css" : "css/night.css";

app.get("/", function (req, res) {
  res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="${cssFile}" />
    
        <title>Question3</title>
      </head>
      <body>
        <form action="/output" method="post">
          <label for="fname">Name</label>
          <input type="text" id="fname" name="name" /><br /><br />
          <label for="fage">Age:</label>
          <input type="text" id="fage" name="age" /><br /><br />
          <input type="submit" value="Submit" />
        </form>
      </body>
    </html>
    `);
});
app.post("/output", (req, res) => {
  req.session.user = {
    name: req.body.name,
    age: req.body.age,
  };
  res.redirect("/");
});
app.get("/sessionData", (req, res) => {
  const { name, age } = req.session.user;
  res.send(`Welcome ${name} and your age is ${age}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
