
// Load config
require("dotenv").config({ path: "./config/config.env" });

module.exports = {
    findAllEvents: async function (req) {
        const events = require("./models/event");
        let eventList = await events.find({}).lean();
        return eventList;
    },
}