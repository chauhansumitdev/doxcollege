import { Request, Response, NextFunction } from "express";
import { Document, PostNotFoundError } from "../queries/index.js";
import { AuthenticatedRequest } from "../middlewares/auth.js";

export class DocumentController {
  static async createNewDocument(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { title, description, price, year } = req.body;
    const docId = await Document.addDocument(title, description, year, price, req.user.userId);

    // upload documents

    res.status(201).json({ docId });
  }

  static async deleteDocument(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send("Invalid Document ID.");
    }

    const { userId } = req.user;

    try {
      const owner = await Document.checkDocumentOwner(userId, id);
      if (owner === false) {
        return res.status(404).json({
          error: "The document does not belongs to you."
        });
      }

      await Document.deleteDocument(id);
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof PostNotFoundError) {
        console.log(error)
        return res.status(404).json({
          error: "The document does not exist in our system."
        });
      }
    }
  }

  static async getAllDocuments(req: Request, res: Response, next: NextFunction) {
    const {
      page = 1,
      limit = 10,
      sortBy = "created_at",
      sortDir = "desc",
    } = req.query;
    const docs = await Document.getDocuments(
      parseInt(page.toString(), 10),
      parseInt(limit.toString(), 10),
      sortBy.toString(),
      sortDir.toString()
    );
    res.json(docs);
  }

  static async getDocumentById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const doc = await Document.getDocumentById(id);
    if (!doc) {
      return res.sendStatus(404);
    }
    res.send(doc);
  }

  static async editDocument(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const { title, description, price, year } = req.body;

    let updates: {} = {};
    if (title) {
      updates["title"] = title;
    }
    if (description) {
      updates["description"] = description
    }
    if (price) {
      updates["price"] = price
    }
    if (year) {
      updates["year"] = year
    }

    const doc = await Document.updateDocument(updates, id);

    // upload documents

    res.status(201).send(doc);
  }
}
