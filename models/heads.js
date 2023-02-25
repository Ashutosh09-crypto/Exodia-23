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
        mail:
        {
            type: String,
            required: true,
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
        facebook:
        {
            type: String,
        },
        image_link:
        {
            type: String,
            required: true,
        }
    }
);

module.exports = mongoose.model("heads", HeadSchema);