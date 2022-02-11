"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("fastify-passport");
const OAuthStrategy = require("passport-oauth").OAuthStrategy;
const request_token_endpoint = "https://www.zotero.org/oauth/request";
const access_token_endpoint = "https://www.zotero.org/oauth/access";
const authorization_endpoint = "https://www.zotero.org/oauth/authorize";
const ZoteroOAuthRoute = (fastify, _, next) => {
    fastify.register(passport.initialize());
    passport.use("zotero", new OAuthStrategy({
        requestTokenURL: request_token_endpoint,
        accessTokenURL: access_token_endpoint,
        userAuthorizationURL: authorization_endpoint,
        consumerKey: process.env.ZOTERO_CLIENT_KEY,
        consumerSecret: process.env.ZOTERO_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/zotero/callback",
    }, (token, tokenSecret, profile, done) => {
        console.log(token, tokenSecret, profile);
        done();
    }));
    fastify.post("/auth/zotero", passport.authenticate("zotero"));
    fastify.get("/auth/zotero/callback", passport.authenticate("zotero", {
        successRedirect: "http://localhost:3000/user/settings",
        failureRedirect: "http://localhost:3000/user/settings",
    }));
    next();
};
module.exports = ZoteroOAuthRoute;
//# sourceMappingURL=zotero.js.map