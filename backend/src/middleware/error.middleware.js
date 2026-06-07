import logger from "../config/logger.js";

const errorHandler = (
  err,
  req,
  res,
  next
) => {
  const statusCode = err.statusCode || 500;

  logger.error(err.message);

  res.status(statusCode).json({
    success: false,

    message:
      err.message || "Internal Server Error",

    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
};

export default errorHandler;