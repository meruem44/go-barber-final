import multer from "multer";
import { randomBytes } from "crypto";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "temp", "uploads");

export default {
  directory: tmpFolder,
  uploadsFolder: resolve(tmpFolder, " uploads"),
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, cb) {
      const fileHash = randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
