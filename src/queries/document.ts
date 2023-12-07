import client from "../config/db.js";

export class PostNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PostNotFoundError";
  }
}

export class Document {
  static async createDocumentTable(): Promise<void> {
    const query = `
      CREATE TABLE 
        IF NOT EXISTS document (
          id SERIAL PRIMARY KEY,
          title VARCHAR(40),
          description TEXT,
          year INTEGER,
          price INTEGER DEFAULT 0,
          created_by INTEGER,
          created_at TIMESTAMP DEFAULT NOW(),
          CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
      );
    `;
    try {
      await client.query(query);
    } catch (error) {
      console.error("Error creating Document table:", error);
    }
  }

  static async addDocument(
    title: string,
    description: string,
    year: number,
    price: number,
    created_by: number
  ): Promise<number | undefined> {
    try {
      const query = `
        INSERT INTO document (title, description, year, price, created_by)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
      `;
      const values = [title, description, year, price, created_by];

      const { rows } = await client.query(query, values);
      return rows[0].id;
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }

  static async deleteDocument(documentId: number): Promise<void> {
    try {
      if (!documentId) {
        throw new Error("Document ID is required.");
      }

      await Document.removeDocument(documentId);
      console.log(`Document with ID ${documentId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }

  static async removeDocument(documentId: number): Promise<void> {
    const query = `
      DELETE FROM document
      WHERE id = $1;
    `;
    const values = [documentId];

    await client.query(query, values);
  }

  static async getDocumentById(documentId: number): Promise<any> {
    const query = `
      SELECT * FROM document
      WHERE id = $1;
    `;
    const values = [documentId];

    const { rows } = await client.query(query, values);
    if (rows.length === 0) {
      throw new PostNotFoundError(`Document with ID ${documentId} not found.`);
    }
    return rows[0];
  }

  static async getDocuments(
    page: number,
    limit: number,
    sortBy: string,
    sortDir: string
  ): Promise<any[]> {
    const offset = (page - 1) * limit;
    const query = `
      SELECT * FROM document
      ORDER BY ${sortBy} ${sortDir}
      LIMIT $1 OFFSET $2;
    `;
    const values = [limit, offset];

    const { rows } = await client.query(query, values);
    return rows;
  }
}
