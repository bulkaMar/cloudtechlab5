const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).send("");
  next();
});

app.all("/", (req, res) => {
  const name = req.query.name || req.body?.name || "world";

  res.json({
    hello: name,
    runtime: "nodejs",
    region: process.env.RENDER_REGION || "unknown",
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
