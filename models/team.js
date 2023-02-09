const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
            unique: true,
        },
        event:
        {
            type: String,
            required: true,
        },
        teamLeader:
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
        ,
        members:
            [
                {
                    member_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                    },
                },
            ]
        ,
        college:
        {
            type: String,
        },
        createdAt:
        {
            type: Date,
            default: Date.now,
        },
        paymentStatus:
        {
            type: Number,
            default: 0,
        }
    }
);

module.exports = mongoose.model("teams", TeamSchema);