const router = require("express").Router();
const { userDetails, findUserTeams } = require("../utils")

const { authCheck } = require("../middleware/auth")

router.get("/profile", authCheck, async (req, res) => {

    const userDetail = await userDetails(req.user);
    const userTeams = await findUserTeams(req.user);

    context = {
        user: userDetail,
        teams: userTeams,
        authenticated: req.isAuthenticated(),
        message: req.flash("message"),
    }
    // users team
    res.render("profile", context);
    req.flash("message", "");
})


router.get("/ourTeam", authCheck, async (req, res) => {


    // users team
    res.render("heads");
    req.flash("message", "");
})

module.exports = router