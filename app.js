const bodyParser = require("body-parser");
const express = require("express");
const date = require(__dirname + "/date.js");

//allows browser to interact with international locales
const intl = require("intl");
const app = express();
//creates an array for new user-added items to go into
//moved the 3 static li from list.ejs to add them into the array for the sake of being succinct
const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

//allows ejs (embedded javascript templating) be used with express. MUST be placed below app = express()
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
//tells the server where to find the location of our static files
app.use(express.static("public"));

/* ---ROOT PAGE CODE---- */
app.get("/", function (req, res) {
  const day = date.getDate();
  /*
  res.render must contain ALL the items we want rendered at the time it's called, or it will fail 
  (i.e., can't have res.render in app.post as well, or it won't work as there will be undefined items)
  */
  res.render("list", { listTitle: day, newListItems: items }); //kindOfDay === shared marker in list.ejs
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

/* ----WORK PAGE CODE---- */
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
