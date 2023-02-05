// Google Oauth
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const users = require("../models/user");
// Load config
require("dotenv").config({ path: "./config/config.env" });

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                    phoneNumber: 0000000000, // do not remove
                };

                try {
                    let user = await users.findOne({ googleId: profile.id });
                    if (user) {
                        done(null, user);
                    } else {
                        user = await users.create(newUser);
                        done(null, user);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        // User.findById(id, (err, user) => done(err, user));
        users.findById(id, (err, user) => done(err, user));
    });
};