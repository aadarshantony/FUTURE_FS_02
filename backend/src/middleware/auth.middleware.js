import jwt from "jsonwebtoken";

import env from "../config/env.js";

import ApiError from "../utils/ApiError.js";

import User from "../modules/users/user.model.js";

export const protect = async (
  req,
  res,
  next
) => {
  try {
    let token;

    const authHeader =
      req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith("Bearer ")
    ) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return next(
        new ApiError(
          401,
          "Authentication required"
        )
      );
    }

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    );

    const user = await User.findById(
      decoded.id
    ).select("-password");

    if (!user) {
      return next(
        new ApiError(
          401,
          "User not found"
        )
      );
    }

    req.user = user;

    next();
  } catch (error) {
    next(
      new ApiError(
        401,
        "Invalid or expired token"
      )
    );
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (
      !roles.includes(req.user.role)
    ) {
      return next(
        new ApiError(
          403,
          "Access denied"
        )
      );
    }

    next();
  };
};