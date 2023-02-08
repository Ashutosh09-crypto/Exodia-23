const router = require("express").Router();
const passport = require("passport");

// auth logout
router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
    req.session.user = null;
    req.session.admin = null;
    if (req.session.returnTo === undefined || req.session.returnTo === null) {
        delete req.session.returnTo;
    }
});

// auth with google+
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] })
);

// callback route for google to redirect to
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/error", keepSessionInfo: true }),
    function (req, res) {
        // console.log(req.user) // user info
        // Successful authentication, redirect success.
        req.flash("message", "Logged in Succesfully");
        if (process.env.NODE_ENV == "development") {
            res.redirect(req.session.returnTo || "/");
            delete req.session.returnTo;
        } else if (process.env.NODE_ENV == "production") {
            res.redirect(
                req.session.returnTo || `https://${req.headers.host}/`
            );
            delete req.session.returnTo;
        } else {
            res.redirect(req.session.returnTo || "/");
            delete req.session.returnTo;
        }
    }
);

module.exports = router;