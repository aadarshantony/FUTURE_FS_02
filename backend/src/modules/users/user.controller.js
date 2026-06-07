import asyncHandler from "../../middleware/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} from "./user.service.js";

export const getUsers =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const users =
        await getAllUsers();

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            users,
            "Users fetched successfully"
          )
        );
    }
  );

export const getUser =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const user =
        await getUserById(
          req.params.id
        );

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            user,
            "User fetched successfully"
          )
        );
    }
  );

export const updateRole =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const {
        role,
      } = req.body;

      const user =
        await updateUserRole(
          req.params.id,
          role
        );

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            user,
            "Role updated successfully"
          )
        );
    }
  );

export const removeUser =
  asyncHandler(
    async (
      req,
      res
    ) => {
      await deleteUser(
        req.params.id
      );

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            null,
            "User deleted successfully"
          )
        );
    }
  );