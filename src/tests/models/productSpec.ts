import { product, products } from "../../models/product";

const testProduct = new products();

describe("Products Model", () => {
  it("should have an index method", () => {
    expect(testProduct.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(testProduct.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(testProduct.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(testProduct.delete).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await testProduct.create({
      name: "milk",
      price: 250,
      id: 1,
    });
    expect(result).toEqual({
      name: "milk",
      price: 250,
      id: 1,
    });
  });

  it("index method should return a list of products", async () => {
    const result = await testProduct.index();
    expect(result).toEqual([
      {
        name: "milk",
        price: 250,
        id: 1,
      },
    ]);
  });

  it("show method should return the correct product", async () => {
    const result = await testProduct.show(1);
    expect(result).toEqual({
      name: "milk",
      price: 250,
      id: 1,
    });
  });

  xit("delete method should remove the product", async () => {
    testProduct.delete(1);
    const result = await testProduct.index();

    expect(result).toEqual([]);
  });
});
