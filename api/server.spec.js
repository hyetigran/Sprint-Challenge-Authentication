const server = require("./server");
const request = require("supertest");

describe("server online", () => {
  it("GET / returns 200", () => {
    return request(server)
      .get("/")
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("returns a response message", () => {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({ message: "Last Sprint!" });
      });
  });

  it("return 404 if page doesn't exist", () => {
    return request(server)
      .get("/api/doesntexist")
      .expect(404);
  });
});
