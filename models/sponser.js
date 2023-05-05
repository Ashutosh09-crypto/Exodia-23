const mongoose = require("mongoose");

const SponserSchema = new mongoose.Schema(
    {

        name:
        {
            type: String,
        },
        image:
        {
            type: String,
        },
        email:
        {
            type: String,
        }
    }
);

module.exports = mongoose.model("sponsors", SponserSchema);