import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
}).single("file");
