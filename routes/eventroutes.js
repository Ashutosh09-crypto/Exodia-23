const router = require("express").Router();
const { findAllEvents } = require("../utils.js")


router.get("/", async (req, res) => {
    let context = {
        events: await findAllEvents(),
    }

    res.render("events.ejs", context);
})


module.exports = router;