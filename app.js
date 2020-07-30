const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

if (!config.get("jwtPrivateKey")) {
  console.error("FATA: ERROR : jwtPrivateKey not defiend");
  process.exit(1);
}


const app = express();

const users = require("./Routes/users");
const auth = require("./Routes/auth");

mongoose
  .connect("mongodb://localhost/authentication", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db...");
  })
  .catch((e) => {
    console.error("cannot connect to db", e);
  });

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}!`));
