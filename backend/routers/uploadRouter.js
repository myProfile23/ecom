import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "max0n1",
  api_key: "839227976549733",
  api_secret: "UpGiFxyB8K0sDs9mC_SvMTrOiPw",
  secure: true,
});

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadRouter.post("/", isAuth, upload.single("image"), async (req, res) => {
  const fileStr = req.file.path;
  const uploadResponse = await cloudinary.uploader.upload(fileStr, {});
  res.send(uploadResponse.secure_url);

  // res.send(`/${req.file.path}`);
});

export default uploadRouter;
