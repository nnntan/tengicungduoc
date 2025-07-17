const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("GET /accounts/:id", () => {
  it("Should return an account by ID and return 200 with JSON body", async () => {
    const newAcc = await request(app)
      .post("/accounts")
      .send({ name: "Jane Doe", email: "jane@gmail.com" });

    const id = newAcc.body.id;
    const res = await request(app).get(`/accounts/${id}`);

    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(id);
    expect(res.body.name).to.equal("Jane Doe");
    expect(res.body.email).to.equal("jane@gmail.com");
  });
  it("Should return 404 if account does not exist", async () => {
    const res = await request(app).get("/accounts/9999");
    expect(res.status).to.equal(404);
  });
});
