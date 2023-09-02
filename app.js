require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require('./routes/auth.routes');
app.use("/auth", authRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes);

const activityRoutes = require('./routes/activity.routes');
app.use('/', activityRoutes);

const rateRoutes = require('./routes/rate.routes');
app.use('/', rateRoutes);

require("./error-handling")(app);

module.exports = app;
