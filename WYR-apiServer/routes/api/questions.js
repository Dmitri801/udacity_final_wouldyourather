const express = require("express");
const router = express.Router();

router.get("/test", (req, res, next) => {
  res.json({
    message: "You've hit the questions"
  });
});

module.exports = router;
