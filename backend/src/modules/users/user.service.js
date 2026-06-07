import User from "./user.model.js";

import ApiError from "../../utils/ApiError.js";

export const getAllUsers = async () => {
  return User.find()
    .select("-password")
    .sort({
      createdAt: -1,
    });
};

export const getUserById = async (
  userId
) => {
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

export const updateUserRole =
  async (
    userId,
    role
  ) => {
    const user =
      await User.findById(
        userId
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    user.role = role;

    await user.save();

    return user;
  };

export const deleteUser =
  async (
    userId
  ) => {
    const user =
      await User.findById(
        userId
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    await User.findByIdAndDelete(
      userId
    );

    return true;
  };