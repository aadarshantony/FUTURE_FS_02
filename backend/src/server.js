import app from "./app.js";

import env from "./config/env.js";
import connectDB from "./config/database.js";
import logger from "./config/logger.js";

connectDB();

const server = app.listen(
  env.PORT,
  () => {
    logger.info(
      `Server running on port ${env.PORT}`
    );
  }
);

process.on(
  "unhandledRejection",
  (error) => {
    logger.error(
      `Unhandled Rejection: ${error.message}`
    );

    server.close(() => {
      process.exit(1);
    });
  }
);

process.on(
  "uncaughtException",
  (error) => {
    logger.error(
      `Uncaught Exception: ${error.message}`
    );

    process.exit(1);
  }
);