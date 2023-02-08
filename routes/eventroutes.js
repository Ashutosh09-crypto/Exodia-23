const router = require("express").Router();
const { findAllEvents } = require("../utils.js")
const { authCheck } = require("../middleware/auth")


router.get("/", authCheck, async (req, res) => {
    let context = {
        authenticated: req.isAuthenticated(),
        events: await findAllEvents(),
    }

    res.render("events.ejs", context);
})


module.exports = router;