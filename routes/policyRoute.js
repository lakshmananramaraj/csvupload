const express = require("express");
const router = express.Router();
const multer = require("multer");
const policyController = require("../controllers/policyController");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), policyController.postUploadCsv);
router.get("/search/:username", policyController.getByUserName);
router.get("/allpolicies", policyController.getAllPolicies);

module.exports = router;
