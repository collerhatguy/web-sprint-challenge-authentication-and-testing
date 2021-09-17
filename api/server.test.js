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
})