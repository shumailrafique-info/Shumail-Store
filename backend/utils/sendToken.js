//creating token and sending cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    httpOnly: true,
    // expires: Date.now() + 15 * 1000 * 60,
    maxAge: 15 * 60 * 1000,
    // sameSite: "none",
    // secure: true,
    path: "/",
  };
  // cookie("token", token, options)

  const { password, ...otherDetails } = user._doc;

  res.status(statusCode).cookie("token", token).json({
    success: true,
    user: otherDetails,
  });
};

module.exports = sendToken;
