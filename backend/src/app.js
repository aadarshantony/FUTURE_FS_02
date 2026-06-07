import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import env from "./config/env.js";

import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import leadRoutes from "./modules/leads/lead.routes.js";
import activityRoutes from "./modules/activities/activity.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";
import publicRoutes from "./modules/public/public.routes.js";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());

app.use(compression());

app.use(cookieParser());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Gatherly API Running",
  });
});

/*
|--------------------------------------------------------------------------
| ROUTES
|--------------------------------------------------------------------------
*/

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users",userRoutes);

app.use("/api/v1/leads", leadRoutes);
app.use("/api/v1/activities",activityRoutes);
app.use( "/api/v1/analytics", analyticsRoutes);
app.use("/api/public", publicRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;