require("./db/config");

const express = require("express"),
  path = require("path"),
  openRoutes = require("./routes/open"),
  passport = require("./middleware/index"),
  cookieParser = require("cookie-parser"),
  secureUserRoutes = require("./routes/secure/users"),
  securePostsRoutes = require("./routes/secure/posts"),
  app = express();

// Parse incoming JSON into objects
// Middleware
app.use(express.json());
app.use(cookieParser());

// Unauthenticated routes
app.use(openRoutes);

// Serve any static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Authentication Middleware
app.use(
  passport.authenticate("jwt", {
    session: false,
  })
);

// Secure routes
app.use(secureUserRoutes);
app.use(securePostsRoutes);

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === "production") {
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

module.exports = app;
