const User = require("../models/userModel");
const sendToken = require("../utils/sendToken.js");
const { createError } = require("../utils/createError");
const validator = require("validator");
const SendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.createUser = async (req, res, next) => {
  try {
    const avatarImg =
      "https://api-private.atlassian.com/users/acccb1b091b6a5e08b90356e02034fd3/avatar";

    const { name, email, password } = req.body;

    //   const myCloud = await cloudinary.v2.uploader.upload(req.file.path);

    const user = await User.create({
      name,
      email: email,
      password,
      // avatar: {
      //   public_id: myCloud.public_id,
      //   url: myCloud.secure_url,
      // },
      avatar: {
        public_id: "123345",
        url: avatarImg,
      },
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(createError("Invalid credentials!", 400));

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) return next(createError("Incorrect email!", 400));

    const isCorrectPassword = await user.comparePassword(password);

    if (!isCorrectPassword)
      return next(createError("Incorrect password!", 400));

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    if (req.body.email) {
      if (validator.isEmail(req.body.email)) {
        req.body.email = req.body.email.toLowerCase();
      } else {
        return next(createError("Invalid email!", 400));
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { ...req.body },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUserPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword)
      return next(createError("Invalid Credentials!", 400));

    let user = await User.findById(req.user._id).select("+password");

    const idCorrectOldPassword = await user.comparePassword(oldPassword);

    if (!idCorrectOldPassword)
      return next(createError("Incorrect old password", 403));

    if (newPassword !== confirmPassword)
      return next(createError("Passwords do not match", 400));

    user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !validator.isEmail(email))
      return next(createError("Invalid Credentials!", 400));

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) return next(createError("User not found!", 404));

    const resetToken = await user.getResetPasswordToken();


    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf your have not requested this email then please ignore it`;
    try {
      await SendEmail({
        email: user.email,
        subject: `Ecommrance Password Recovery`,
        message,
      });

      res.status(200).json({
        success: true,
        message: `Recovery email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return next(createError(error.message, 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params;

    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword)
      return next(createError("Invalid Credentials!", 400));

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    let user = await User.findOne({ resetPasswordToken }).select("+password");

    if (!user) return next(createError("User not found!", 404));

    if (newPassword !== confirmPassword)
      return next(createError("Passwords do not match", 400));

    if (new Date(Date.now()) > new Date(user.resetPasswordExpire))
      return next(createError("Link Expired", 400));

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    user.password = newPassword;

    await user.save();

    res.status(200).json({
      succes: true,
      message: "Password Updated",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logged out SuccessFull",
      });
  } catch (error) {
    next(error);
  }
};

exports.getLoggedInUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
//(Admin)

exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        createError(`User does not exist with Id: ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAnyUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        createError(`User does not exist with Id: ${req.params.id}`, 404)
      );
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User Deleted!",
    });
  } catch (error) {
    next(error);
  }
};

//(Admin)
exports.updateUserRole = async (req, res, next) => {
  try {
    if (!req.body.role) {
      return next(createError(`Role is Required`, 400));
    }

    let user = await User.findById(req.params.id);

    if (!user) {
      return next(
        createError(`User does not exist with Id: ${req.params.id}`, 404)
      );
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      message: `Role Updated to ${user.role}`,
    });
  } catch (error) {
    next(error);
  }
};
//(Admin)

exports.getAllUseres = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
