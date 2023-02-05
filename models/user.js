const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        googleId:
        {
            type: String,
            required: true,
        },
        firstName:
        {
            type: String,
            required: true,
        },
        lastName:
        {
            type: String,
        },
        phoneNumber:
        {
            type: Number,
            required: true,
        },
        email:
        {
            type: String,
            required: true,
        },
        teams:
            [
                {
                    teamId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "team",
                        default: null,
                    },
                    eventId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "event",
                        default: null,
                    }

                }
            ],
        image:
        {
            type: String,
        },
        registeredAt:
        {
            type: Date,
            default: Date.now
        },
        college:
        {
            type: String,
        },
        paymentStatus:
        {
            type: Number,
            default: 0
        },
        underTaking:
        {
            type: String,
        }
    }
);

module.exports = mongoose.model("users", UserSchema);