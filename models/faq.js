const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema(
    {
        question:
        {
            type: String,
            required: true,
        },
        answer:
        {
            type: String,
            required: true,
        },
        image:
        {
            type: String,
        }
    }
);

module.exports = mongoose.model("faqs", FaqSchema);