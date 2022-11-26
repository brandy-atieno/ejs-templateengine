const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 2000;
//set view engine
app.set("view engine", "ejs");
// load public files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//index
app.get("/", (req, res) => {
  res.render("index");
});
//about
app.get("/about", (req, res) => {
  res.render("about");
});
//contact
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.post("/contact", (req, res) => {
  // res.render('contact')
  const data = req.body;
  console.log("data entered:", data);
  const prevData = fs.readFileSync("data.txt", "utf-8");
  console.log("prevoius data:", prevData);

  const prevDataObj = prevData ? JSON.parse(prevData) : [];

  prevDataObj.push(Object.values(data))

  console.log("combined array:", prevDataObj);
  fs.writeFileSync("data.txt", JSON.stringify(prevDataObj));

  res.end();
});
//searvices
app.get("/services", (req, res) => {
  res.render("services");
});
//testimonial
app.get("/testimonial", (req, res) => {
  res.render("testimonial");
});
//works
app.get("/works", (req, res) => {
  res.render("works");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
