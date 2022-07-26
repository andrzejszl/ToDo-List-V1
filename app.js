const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const date = require(__dirname + "/date.js")

const port = 3000;

const app = express();

const newItemsValues = ["Buy food", "Cook food", "Eat food"];
const workItems = [];


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));



app.set("view engine", "ejs");

app.get("/", function (req, res) {

    let day = date.getDate();

    res.render("list", {
        listTitle: day,
        newItemsValues: newItemsValues
    });
})

app.post("/", function (req, res) {
    let newItemValue = req.body.newItem;

    if (req.body.list === "Work List") {
        workItems.push(newItemValue);
        res.redirect("/work");
    } else {
        newItemsValues.push(newItemValue);
        res.redirect("/");
    }


})


app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newItemsValues: workItems
    });
})

app.get("/about", function (req, res) {
    res.render("about");
});

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})


app.listen(port, function () {
    console.log("Server started on port " + port);
})