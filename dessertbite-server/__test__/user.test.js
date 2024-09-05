const request = require("supertest");
const app = require("../app");
const { hash } = require("../helpers/bcrypt");
const { sequelize } = require("../models/index");
const { signToken } = require("../helpers/jwt");

let accessToken;
beforeAll(async () => {
  const users = require("../data/user.json");
  users.forEach((el) => {
    el.password = hash(el.password);
    el.updatedAt = el.createdAt = new Date();
  });

  sequelize.queryInterface.bulkInsert("Users", users, {});

  const payload = {
    id: 1,
    email: "zahrahfatimah@mail.com",
  };

  accessToken = signToken(payload);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST/login", () => {
  describe("POST/login - succeed", () => {
    // berhasil login dan access token
    test("berhasil login MOMS <3", async () => {
      const body = { email: "zahrahfatimah@mail.com", password: "zahrah123" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(200);
      expect(response.body);
    });
  });

  describe("POST/login - failed", () => {
    // error email kosong
    test("email kosong", async () => {
      const body = { email: "", password: "zahrah123" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error password kosong
    test("password kosong", async () => {
      const body = { email: "zahrahfatimah@mail.com", password: "" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    //error email tidak terdaftar
    test("email tidak ada", async () => {
      const body = {
        email: "johndoeeeee@example.com",
        password: "zahrah123",
      };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    //error password tidak match
    test("password salah", async () => {
      const body = { email: "zahrahfatimah@mail.com", password: "password133" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
