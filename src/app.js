const express = require("express");
const app = express().use(express.json());

const accounts = [];
let nextId = 1;

app
  .route("/accounts")
  .get((_, res) => {
    res.json(accounts);
  })
  .post((req, res) => {
    const a = { id: nextId++, ...req.body };
    accounts.push(a);
    res.status(201).json(a);
  });

module.exports = app;
