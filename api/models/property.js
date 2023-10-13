const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    price: { type: Number },
    size: { type: Number },
    buildingStatus: { type: String },
    sellingStatus: { type: String },
    bedroom: { type: Number },
    bathroom: { type: Number },
    propertyImage: { type: String  },
    floorPlan1:{type: String  },
    floorPlan1:{type: String  },
    description:{type: String  }
    
});

module.exports = mongoose.model('Property', propertySchema);