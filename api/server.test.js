const server = require("./server")
const request = require("supertest")
const db = require("../data/dbConfig")
const bcrypt = require("bcrypt")

test('sanity', () => {
  expect(true).toBe(true)
})
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => await db.seed.run())

describe("/api/auth/register", () => {
  describe("success route", () => {
    let res
    beforeEach(async () => 
      res = await request(server).post("/api/auth/register")
        .send({ username: "username", password: "1234" })
    )
    test("returns a 201", () => {
      expect(res.status).toBe(201)
    })
    test("updates the db", async () => {
      const users = await db("users")
      expect(users).toHaveLength(4)
    })
    test("sends back account with hashed password", () => {
      const { username, password } = res.body
      expect(username).toBe("username")
      const hashedProperly = bcrypt.compareSync("1234", password)
      expect(hashedProperly).toBeTruthy()
    })
  })
  describe("faluire route", () => {
    test("username must be unique", async () => {
      const res = await request(server).post("/api/auth/register").send({ username: "rowValue1", password: "1234" })
      expect(res.status).toBe(401)
      expect(res.body.message.includes("username taken")).toBeTruthy()
    })
    test("contains both username and password", async () => {
      const res = await request(server).post("/api/auth/register").send({ username: "rowValue1"})
      expect(res.status).toBe(404)
      expect(res.body.message.includes("password required"))
    })
    test("contains both username and password", async () => {
      const res = await request(server).post("/api/auth/register").send({ password: "rowValue1"})
      expect(res.status).toBe(404)
      expect(res.body.message.includes("username required"))
    })
  })
})
describe("/api/auth/login", () => {
  describe("success", () => {
    test("returns message and token", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "rowValue1", password: "1234" })
      expect(res.body).toHaveProperty("token")
      expect(res.body).toHaveProperty("message")
      expect(res.body.message.includes("welcome"))
    })
  })
  describe("failure", () => {
    test("returns invalid credentials", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "rowValue1", password: "1234" })
      expect(res.body).toHaveProperty("message")
      expect(res.body.message.includes("invalid crednetials"))
    })
  })
})