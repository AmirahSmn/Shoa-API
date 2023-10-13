const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const PropertyController = require('../controllers/property');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", PropertyController.property_get_all);

//upload.single('propertyImage')
router.post("/", checkAuth, PropertyController.property_create_property);

router.get("/:propertyId", PropertyController.property_get_property);

router.patch("/:propertyId", checkAuth, PropertyController.property_update_property);

router.delete("/:propertyId", checkAuth, PropertyController.property_delete);

module.exports = router;
