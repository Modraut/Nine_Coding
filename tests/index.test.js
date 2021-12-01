const request = require("supertest")
const app = require('../index')
const fs = require('fs')
const { test1, result1, test2, result2 } = require('./data')

describe("POST /", () => {

  // This test is using sample request and response
  test("valid JSON", async () => {
    const response = await request(app).post("/").send(test1)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(result1)
  })

  test("invalid JSON - drm:false || episodeCount =<0", async () => {
    const response = await request(app).post("/").send(test2)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(result2)
  })

  test("invalid JSON - payload is not an array", async () => {
    const response = await request(app).post("/").send({ "payload": "random" })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(result2)
  })
  test("invalid JSON - payload is missing", async () => {
    const response = await request(app).post("/").send({ "body": "random" })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(result2)
  })

  test("bad request - the request body is not json and cannot be parsed", async () => {
    const response = await request(app).post("/").send("Random string")
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(result2)
  })

})
