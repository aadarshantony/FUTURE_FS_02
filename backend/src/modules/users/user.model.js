import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: [
        "admin",
        "user",
      ],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre(
  "save",
  async function (next) {
    if (
      !this.isModified(
        "password"
      )
    )
      return next();

    this.password =
      await bcrypt.hash(
        this.password,
        12
      );

    next();
  }
);

userSchema.methods.comparePassword =
  async function (
    candidatePassword
  ) {
    return bcrypt.compare(
      candidatePassword,
      this.password
    );
  };

userSchema.index({
  email: 1,
});

const User = mongoose.model(
  "User",
  userSchema
);

export default User;