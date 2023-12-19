import { Comment } from "../queries/comment.model.js";
import { Document } from "../queries/document.js";
import { Upload } from "../queries/upload.js";
import { User } from "../queries/user.js";

export class Tables {
  static async createTables() {
    try {
      await User.createUserTable();
      await Document.createDocumentTable();
      // await Comment.createCommentTable();
      await Upload.createUploadTable();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create tables");
    }
  }
}
