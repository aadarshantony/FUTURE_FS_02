import asyncHandler from "../../middleware/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "./auth.service.js";

export const register =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const {
        name,
        email,
        password,
      } = req.body;

      const result =
        await registerUser(
          name,
          email,
          password
        );

      res
        .status(201)
        .json(
          new ApiResponse(
            201,
            result,
            "Registration successful"
          )
        );
    }
  );

export const login =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const {
        email,
        password,
      } = req.body;

      const result =
        await loginUser(
          email,
          password
        );

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            result,
            "Login successful"
          )
        );
    }
  );

export const me =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const user =
        await getCurrentUser(
          req.user._id
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