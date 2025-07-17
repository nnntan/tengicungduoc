const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("PUT /accounts/:id", () => {
  it("Should update an existing account and return 200 with JSON body", async () => {
    const newAcc = await request(app)
      .post("/accounts")
      .send({ name: "Jane Doe", email: "jane@gmail.com" });

    const id = newAcc.body.id;
    const payload = { name: "pro", email: "pro@gmail.com" };
    const res = await request(app).put(`/accounts/${id}`).send(payload);

    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(id);
    expect(res.body.name).to.equal(payload.name);
    expect(res.body.email).to.equal(payload.email);
  });
  it("Should return 404 if updating a non-existing account", async () => {
    const res = await request(app)
      .put("/accounts/9999")
      .send({ name: "pro - updated", email: "pro@gmail.com - updated" });
    expect(res.status).to.equal(404);
  });
});
