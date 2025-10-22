const express = require("express");
const router = express.Router();
const {
  createString,
  getString,
  getAllStrings,
  deleteString,
  filterByNaturalLanguage
} = require("../controllers/stringController");

router.post("/", createString);
router.get("/", getAllStrings);
router.get("/filter-by-natural-language", filterByNaturalLanguage);
router.get("/:value", getString);
router.delete("/:value", deleteString);

module.exports = router;
