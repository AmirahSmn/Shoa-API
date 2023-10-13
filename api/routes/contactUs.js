const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ContactUsController = require('../controllers/contactUs');
/*
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
*/
router.get("/", ContactUsController.contactUs_get_all);

//upload.single('contactUsImage')
router.post("/", checkAuth, ContactUsController.contactUs_create_contactUs);

router.get("/:contactUsId", ContactUsController.contactUs_get_contactUs);

router.patch("/:contactUsId", checkAuth, ContactUsController.contactUs_update_contactUs);

router.delete("/:contactUsId", checkAuth, ContactUsController.contactUs_delete);

module.exports = router;
