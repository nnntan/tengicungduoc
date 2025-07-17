const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("POST /accounts", () => {
  it("Should create a new account and return 201 with JSON body", async () => {
    const payload = { name: "John Doe", email: "john@example.com" };
    const res = await request(app).post("/accounts").send(payload);
    expect(res.status).to.equal(201);
    expect(res.body).to.include.keys("id", "name", "email");
    expect(res.body.name).to.equal(payload.name);
    expect(res.body.email).to.equal(payload.email);
  });
});
