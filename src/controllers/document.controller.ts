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

  static async deletePost(req: Request, res: Response, next: NextFunction) {
    const docId = parseInt(req.params.id, 10);
    if (isNaN(docId)) {
      return res.status(400).send("Invalid Document ID.");
    }

    await Document.deleteDocument(docId);
    res.sendStatus(204);
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
}
