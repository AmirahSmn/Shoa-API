const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const BlogController = require('../controllers/blog');
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
router.get("/", BlogController.blog_get_all);

//upload.single('blogImage')
router.post("/", checkAuth, BlogController.blog_create_blog);

router.get("/:blogId", BlogController.blog_get_blog);

router.patch("/:blogId", checkAuth, BlogController.blog_update_blog);

router.delete("/:blogId", checkAuth, BlogController.blog_delete);

module.exports = router;
