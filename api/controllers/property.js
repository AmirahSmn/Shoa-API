const mongoose = require("mongoose");
const Property = require("../models/property");

exports.property_get_all = (req, res, next) => {
  Property.find()
    .select("name price _id propertyImage")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        property: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            size: doc.size,
            name: doc.name,
            buildingStatus: doc.buildingStatus,
            sellingStatus: doc.sellingStatus,
            bedroom: doc.bedroom,
            bathroom: doc.bathroom,
            floorPlan1: doc.floorPlan1,
            floorPlan2: doc.floorPlan2,
            description: doc.description,
           propertyImage: doc.propertyImage,
            _id: doc._id,
           
            request: {
              type: "GET",
              url: "http://localhost:3000/property/" + doc._id
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

exports.property_create_property = (req, res, next) => {
  const property = new Property({
    _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    name: req.body.name,
    buildingStatus: req.body.buildingStatus,
    sellingStatus: req.body.sellingStatus,
    bedroom: req.body.bedroom,
    bathroom: req.body.bathroom,
    floorPlan1: req.body.floorPlan1,
    floorPlan2: req.body.floorPlan2,
    description: req.body.description,
   propertyImage: req.body.propertyImage
  });
  console.log(req.body.price);

  property
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created property successfully",
          createdProperty: {
          name: result.name,
          price: result.price,
          size: result.size,
          buildingStatus: result.buildingStatus,
          sellingStatus: result.sellingStatus,
          bedroom: result.bedroom,
          bathroom: result.bathroom,
          floorPlan1: result.floorPlan1,
          floorPlan2: result.floorPlan2,
          description: result.description,
         propertyImage: result.propertyImage,
          _id: result._id
        },

          request: {
            type: "GET",
            url: "http://localhost:3000/property/" + result._id
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

exports.property_get_property = (req, res, next) => {
  const id = req.params.propertyId;
  Property.findById(id)
    .select("name price _id propertyImage")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          property: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/property"
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

exports.property_update_property = (req, res, next) => {
  const id = req.params.propertyId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Property.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Property updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/property/" + id
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

exports.property_delete = (req, res, next) => {
  const id = req.params.propertyId;
  console.log
  Property.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Property deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/property",
          body: { name: "String", price: "Number" }
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
