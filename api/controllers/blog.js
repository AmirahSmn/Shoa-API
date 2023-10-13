const mongoose = require("mongoose");
const Blog = require("../models/blog");

exports.blog_get_all = (req, res, next) => {
    Blog.find()
    .select("title paragraph _id ")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        blog: docs.map(doc => {
          return {
            title: doc.name,
            paragraph: doc.paragraph,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/blog/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.blog_create_blog = (req, res, next) => {
  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    paragraph: req.body.paragraph,
    });
  console.log(req.body.paragraph);

  blog
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created blog successfully",
          createdBlog: {
          title: result.title,
          paragraph: result.paragraph,
                    _id: result._id
        },

          request: {
            type: "GET",
            url: "http://localhost:3000/blog/" + result._id
          }
        
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.blog_get_blog = (req, res, next) => {
  const id = req.params.blogId;
  Blog.findById(id)
    .select("title paragraph _id ")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            blog: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/blog"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.blog_update_blog = (req, res, next) => {
  const id = req.params.blogId;
  const updateOps = {};
  for (const ops of Object.keys(req.body)) {
    updateOps[ops.propName] = ops.value;
  };
  console.log(req.body);

 Blog.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Blog updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/blog/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message:'inside dite patch error'
      });
    });
};

exports.blog_delete = (req, res, next) => {
  const id = req.params.siteId;
  Blog.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Blog deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/site",
          body: { title: "String", paragraph: "String" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};