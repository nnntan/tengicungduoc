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

app
  .route("/accounts/:id")
  .all((req, res, next) => {
    const account = accounts.find((a) => a.id === parseInt(req.params.id));
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    req.account = account;
    next();
  })
  .get((req, res) => {
    res.json(req.account);
  })
  .put((req, res) => {
    res.json(Object.assign(req.account, req.body));
  })
  .delete((req, res) => {
    accounts.splice(accounts.indexOf(req.account), 1);
    res.status(204).end();
  });

module.exports = app;
