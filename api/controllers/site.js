const mongoose = require("mongoose");
const Site = require("../models/site");

exports.site_get_all = (req, res, next) => {
  Site.find()
    .select("name location _id ")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        site: docs.map(doc => {
          return {
            name: doc.name,
            location: doc.location,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/site/" + doc._id
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

exports.site_create_site = (req, res, next) => {
  const site = new Site({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    location: req.body.location,
    });
  console.log(req.body.price);

  site
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created site successfully",
          createdSite: {
          name: result.name,
          location: result.location,
                    _id: result._id
        },

          request: {
            type: "GET",
            url: "http://localhost:3000/site/" + result._id
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

exports.site_get_site = (req, res, next) => {
  const id = req.params.siteId;
  Site.findById(id)
    .select("name location _id ")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            site: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/site"
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

exports.site_update_site = async (req, res, next) => {
  const id = req.params.siteId;
  const updateOps = {};
  for (const ops of Object.keys(req.body)) {
    updateOps[ops.propName] = ops.value;
  };
  console.log(req.body);

  await Site.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Site updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/site/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message:'inside dite pathc error'
      });
    });
};

exports.site_delete = (req, res, next) => {
  const id = req.params.siteId;
  Site.deleteOne({ id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Site deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/site",
          body: { name: "String", location: "String" }
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
