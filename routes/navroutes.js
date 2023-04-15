const router = require("express").Router();
const { userDetails, findUserTeams, findAllHeads, refactorHeads } = require("../utils")

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

router.get("/brochures", async (req, res) => {
    const context = {
        authenticated: req.isAuthenticated()
    }
    res.render("brochure", context);
})


router.get("/ourTeam", authCheck, async (req, res) => {

    const headsData = await findAllHeads();

    let heads = refactorHeads(headsData);

    const context = {
        authenticated: req.isAuthenticated(),
        headTitles: heads
    }

    // users team
    res.render("heads", context);
    req.flash("message", "");
})
router.get("/developers", authCheck, async (req, res) => {


    const context = {
        authenticated: req.isAuthenticated(),
    }
    // users team
    res.render("developers", context);
    req.flash("message", "");
})

module.exports = router