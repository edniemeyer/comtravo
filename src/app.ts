import express from "express";
import timeout from "connect-timeout";

const app = express();

app.use(timeout('1s'))

app.get("/", (req, res) => {
  res.send("Hi!");
});


export default app;