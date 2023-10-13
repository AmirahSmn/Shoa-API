const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const SiteController = require('../controllers/site');
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
router.get("/", SiteController.site_get_all);

//upload.single('siteImage')
router.post("/", checkAuth, SiteController.site_create_site);

router.get("/:siteId", SiteController.site_get_site);

router.patch("/:siteId", checkAuth, SiteController.site_update_site);

router.delete("/:siteId", checkAuth, SiteController.site_delete);

module.exports = router;
