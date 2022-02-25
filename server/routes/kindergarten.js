const express = require("express");
const router = express.Router();
const {
  kindergartensController,
} = require("../controller/kindergartensController");

/* GET kindergartens listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/kindergartens", (req, res) =>
  kindergartensController.kindergartens(req, res)
);
router.post("/deletekindergartens", (req, res) =>
  kindergartensController.deleteKindergarten(req, res)
);
router.post("/newkindergartens", (req, res) =>
  kindergartensController.newKindergarten(req, res)
);
router.post("/updatekindergartens", (req, res) =>
  kindergartensController.updateKindergarten(req, res)
);

module.exports = router;
