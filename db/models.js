const path = require('path');
const mongoose = require('mongoose');
//var mongoose = require(path.join(__dirname, '../libs/mongoose'));

const Schema = mongoose.Schema;
/** Temporary for creation */


/** Mongoose Schemas */
const securitySchema = new Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    sert: {
        type: String,
        required: true
    }
});

const buildingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    time: {
        type: String
    },
    lunch: {
        type: String
    },
    recnum: {
        type: String
    },
    hdnum: {
        type: String
    },
    ednum: {
        type: String
    }
});

/** Mongoose models */
var securityModel = mongoose.model('security', securitySchema);
var buildingModel = mongoose.model('buildings', buildingSchema);

module.exports.securityModel = securityModel;
module.exports.buildingModel = buildingModel;