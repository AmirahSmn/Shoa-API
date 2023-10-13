const mongoose = require("mongoose");
const ContactUs = require("../models/contactUs");

exports.contactUs_get_all = (req, res, next) => {
    ContactUs.find()
    .select("name email subject message _id ")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        contactUs: docs.map(doc => {
          return {
            name: doc.name,
            email: doc.email,
            subject: doc.subject,
            message: doc.message,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/contactUs/" + doc._id
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

exports.contactUs_create_contactUs = (req, res, next) => {
  const contactUs = new ContactUs({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    });
  console.log(req.body.price);

  contactUs
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created contactUs successfully",
          createdContactUs: {
          name: result.name,
          email: result.email,
          subject: result.subject,
          message: result.message,
                    _id: result._id
        },

          request: {
            type: "GET",
            url: "http://localhost:3000/contactUs/" + result._id
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

exports.contactUs_get_contactUs = (req, res, next) => {
  const id = req.params.contactUsId;
  ContactUs.findById(id)
    .select("name email subject message _id ")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            contactUs: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/contactUs"
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

exports.contactUs_update_contactUs = async (req, res, next) => {
  const id = req.params.contactUsId;
  const updateOps = {};
  for (const ops of Object.keys(req.body)) {
    updateOps[ops.propName] = ops.value;
  };
  console.log(req.body);

  await ContactUs.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "ContactUs updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/contactUs/" + id
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

exports.contactUs_delete = (req, res, next) => {
  const id = req.params.contactUsId;
  ContactUs.deleteOne({ id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "ContactUs deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/contactUs",
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
