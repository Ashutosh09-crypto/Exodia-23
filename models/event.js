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
            required: true,
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
            required: true,
        },
        venue:
        {
            type: String,
            required: true,
        },
        teamSize: {
            type: Number,
            required: true
        },
        results: {
            type: String,
        }
    }
);

module.exports = mongoose.model("events", EventSchema);