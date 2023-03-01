const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
        },
        content:
        {
            type: String,
        },
        event_image:
        {
            type: String,
        },
        rulebook_link:
        {
            type: String,
        },
        fixture_link:
        {
            type: String,
        },
        eventCoordinator:
        {
            name:
            {
                type: String,
            },
            phone:
            {
                type: String,
            },
        },
        fees:
        {
            type: Number,
        },
        venue:
        {
            type: String,
        },
        teamSize: {
            type: Number,
        },
        results: {
            type: String,
        },
        club: {
            type: String,
            required: true
        },
        order: {
            type: Number,
        }
    }
);

module.exports = mongoose.model("events", EventSchema);