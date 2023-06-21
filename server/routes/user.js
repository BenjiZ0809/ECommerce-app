import express from "express";

const router = express.Router();

router.route("/me").get((req, res) => {
  res.send("Me");
});

// http://localhost:6000/api/v1/user/me

export default router;
