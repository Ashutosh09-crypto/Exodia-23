const mongoose = require("mongoose");

const HeadSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
        },
        title:
        {
            type: String,
            required: true,
        },
        subtitle:
        {
            type: String,
        },
        instagram:
        {
            type: String,
        },
        phone:
        {
            type: [Number],
            required: true,
        },
        linkedin:
        {
            type: String,
        },
        twitter:
        {
            type: String,
        },
        image_link:
        {
            type: String,
            required: true,
        }, order:
        {
            type: String,
        },
    }
);

module.exports = mongoose.model("heads", HeadSchema);