import client from "../db.js";
import { QueryResultRow } from "pg";

export class User {
  static async createUserTable(): Promise<void> {
    const query = `
      CREATE TABLE 
        IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          full_name VARCHAR(255),
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
    `;
    try {
      await client.query(query);
    } catch (error) {
      console.error("Error creating users table:", error);
    }
  }

  static async doesEmailAlreadyExists(email: string): Promise<boolean> {
    const existingEmail = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return existingEmail.rowCount > 0 ? true : false;
  }

  static async doesUserExists(id: number): Promise<boolean> {
    const { rows } = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return rows.length > 0 ? true : false;
  }

  static async addNewUserToDB(
    fullName: string,
    email: string,
    password: string
  ): Promise<QueryResultRow | null> {
    const user = await client.query(
      `
      INSERT INTO users (full_name, email, password) 
        VALUES ($1, $2, $3) RETURNING *
      `,
      [fullName, email, password]
    );
    return user ? user.rows[0] : null;
  }
}
