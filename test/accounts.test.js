const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("GET /accounts", () => {
  it("should return 200 OK and an empty array", async () => {
    const res = await request(app).get("/accounts");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array").that.is.empty;
  });
});
