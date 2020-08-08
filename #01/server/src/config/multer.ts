import crypto from "crypto";
import multer from "multer";
import path from "path";

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename(req, file, cb) {
      const fileHash = `${crypto.randomBytes(6).toString("hex")} - ${
        file.originalname
      }`;

      cb(null, fileHash);
    },
  }),
};
