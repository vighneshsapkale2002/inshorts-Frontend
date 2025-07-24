const mongoose = require("mongoose");

const inshortsSchema = mongoose.Schema({
    id: String,
    image: {
        type: String,
        default: '',
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10000,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,

});

const model = mongoose.model("inshortInfo", inshortsSchema);

module.exports = model;