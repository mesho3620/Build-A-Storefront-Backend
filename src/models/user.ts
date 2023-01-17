// @ts-ignore
import Client from "../database";
import bcrypt from "bcrypt";

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as string;

export type user = {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
};

export class users {
  async index(): Promise<user[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<user> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: user): Promise<user> {
    try {
      const sql =
        "INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *";

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [u.first_name, u.last_name, hash]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<user> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<user | null> {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = "SELECT password FROM users WHERE first_name = ($1)";
    const result = await conn.query(sql, [username]);

    if (result.rows.length) {
      const user = result.rows[0];
      console.log(user);
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }

    return null;
  }
}
