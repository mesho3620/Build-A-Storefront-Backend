import { user, users } from "../../models/user";

const testuser = new users();

describe("users Model", () => {
  it("should have an index method", () => {
    expect(testuser.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(testuser.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(testuser.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(testuser.delete).toBeDefined();
  });

  it("create method should add a user", async () => {
    const result = await testuser.create({
      first_name: "testuserFName",
      last_name: "testuserLName",
      password: "1234",
      id: 1,
    });
    expect(result).toEqual({
      first_name: "testuserFName",
      last_name: "testuserLName",
      password: "1234",
      id: 1,
    });
  });

  it("index method should return a list of users", async () => {
    const result = await testuser.index();
    expect(result).toEqual([
      {
        first_name: "testuserFName",
        last_name: "testuserLName",
        password: "1234",
        id: 1,
      },
    ]);
  });

  it("show method should return the correct user", async () => {
    const result = await testuser.show(1);
    expect(result).toEqual({
      first_name: "testuserFName",
      last_name: "testuserLName",
      password: "1234",
      id: 1,
    });
  });

  xit("delete method should remove the user", async () => {
    testuser.delete(1);
    const result = await testuser.index();

    expect(result).toEqual([]);
  });
});
