const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "PLease Enter Your Name"],
      maxLength: [30, "Max length Exceeded"],
      minLength: [5, "Min 5 characters in name"],
    },
    email: {
      type: String,
      required: [true, "PLease Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "PLease Enter Your Password"],
      minLength: [8, "Password should be greater then 8 character"],
      select: false,
    },
    addresses: [
      {
        name: {
          type: String,
          maxLength: [30, "Max length Exceeded"],
          minLength: [5, "Min 5 characters in name"],
        },
        street: {
          type: String,
          maxLength: [30, "Max length Exceeded"],
          minLength: [5, "Min 5 characters in name"],
        },
        city: {
          type: String,
          maxLength: [30, "Max length Exceeded"],
          minLength: [5, "Min 5 characters in name"],
        },
        state: {
          type: String,
          maxLength: [30, "Max length Exceeded"],
          minLength: [5, "Min 5 characters in name"],
        },
        country: {
          type: String,
          maxLength: [30, "Max length Exceeded"],
          minLength: [5, "Min 5 characters in name"],
        },
        pinCode: {
          type: String,
          maxLength: [30, "Max length Exceeded"],
          minLength: [5, "Min 5 characters in name"],
        },
        phone: {
          type: String,
          maxLength: [30, "Max length Exceeded"],
          minLength: [5, "Min 5 characters in name"],
        },
      },
    ],
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("email")) {
    next();
  }
  this.email = this.email.toLowerCase();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing and adding to user Schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
