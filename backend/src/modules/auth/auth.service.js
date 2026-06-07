import jwt from "jsonwebtoken";

import User from "../users/user.model.js";

import env from "../../config/env.js";

import ApiError from "../../utils/ApiError.js";

const generateToken = (
  userId
) => {
  return jwt.sign(
    {
      id: userId,
    },
    env.JWT_SECRET,
    {
      expiresIn:
        env.JWT_EXPIRES_IN,
    }
  );
};

export const registerUser =
  async (
    name,
    email,
    password
  ) => {
    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      throw new ApiError(
        409,
        "Email already exists"
      );
    }

    const user =
      await User.create({
        name,
        email,
        password,
      });

    const token =
      generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  };

export const loginUser =
  async (
    email,
    password
  ) => {
    const user =
      await User.findOne({
        email,
      }).select("+password");

    if (!user) {
      throw new ApiError(
        401,
        "Invalid credentials"
      );
    }

    const isMatch =
      await user.comparePassword(
        password
      );

    if (!isMatch) {
      throw new ApiError(
        401,
        "Invalid credentials"
      );
    }

    const token =
      generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  };

export const getCurrentUser =
  async (userId) => {
    const user =
      await User.findById(
        userId
      ).select("-password");

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return user;
  };