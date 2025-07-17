const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("DELETE /accounts/:id", () => {
  it("Should delete an existing account and return 204", async () => {
    const newAcc = await request(app)
      .post("/accounts")
      .send({ name: "Jane Doe", email: "jane@gmail.com" });

    const id = newAcc.body.id;
    const res = await request(app).delete(`/accounts/${id}`);

    expect(res.status).to.equal(204);
  });

  it("Should return 404 if deleting a non-existing account", async () => {
    const res = await request(app).delete("/accounts/9999");
    expect(res.status).to.equal(404);
  });
});
