// @ts-ignore
import Client from "../database";

export type order = {
  id: number;
  user_id: number;
  status: string;
};

export class orders {
  async index(): Promise<order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<order> {
    try {
      //      const sql = "SELECT * FROM orders WHERE id=($1)";
      const sql =
        "SELECT * FROM ((orders AS o JOIN order_products AS op ON o.id = op.order_ID) JOIN products AS p ON op.product_ID = p.id) WHERE o.id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async showUserOrders(id: number): Promise<order> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(o: order): Promise<order> {
    try {
      const sql =
        "INSERT INTO orders ( user_ID, Status) VALUES($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [o.user_id, o.status]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${o.id}. Error: ${err}`);
    }
  }

  async addProduct(oID: number, pID: number): Promise<order> {
    try {
      const sql =
        "INSERT INTO order_Products ( order_ID, product_ID) VALUES($1, $2) RETURNING *";
      const sql2 = "SELECT * FROM orders WHERE id= $1;";
      // @ts-ignore
      const conn = await Client.connect();
      const result2 = await conn.query(sql2, [oID]);
      if (result2.rows.length > 0) {
        const result = await conn.query(sql, [oID, pID]);
        const order = result.rows[0];

        conn.release();

        return order;
      }
      throw new Error(`Could not add product as order ${oID} does not exist`);
    } catch (err) {
      throw new Error(
        `Could not add new product ${pID} to oder ${oID}. Error: ${err}`
      );
    }
  }

  async delete(id: number): Promise<order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
