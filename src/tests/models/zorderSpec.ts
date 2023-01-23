import { order, orders } from "../../models/order";

const testorder = new orders();

describe("orders Model", () => {
  it("should have an index method", () => {
    expect(testorder.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(testorder.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(testorder.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(testorder.delete).toBeDefined();
  });

  it("create method should add a order", async () => {
    const result = await testorder.create({
      user_id: 1,
      status: "active",
      id: 2,
    });
    expect(result).toEqual({
      user_id: 1,
      status: "active",
      id: 2,
    });
  });

  it("index method should return a list of orders", async () => {
    const result = await testorder.index();
    expect(result).toEqual([
      {
        user_id: 1,
        status: "active",
        id: 2,
      },
    ]);
  });

  it("show method should return the correct order", async () => {
    const result = await testorder.show(2);
    expect(result).toEqual({
      user_id: 1,
      status: "active",
      id: 2,
    });
  });

  xit("delete method should remove the order", async () => {
    testorder.delete(2);
    const result = await testorder.index();
    expect(result).toEqual([]);
  });
});
