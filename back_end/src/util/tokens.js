const { sign } = require("jsonwebtoken");

const createAccessToken = (userId, isAdmin) => {
  return sign(
    {
      userId,
      isAdmin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

const sendAccessToken = (res, req, accesstoken, user) => {
  res
    .cookie("accessToken", accesstoken, {
      httpOnly: true,
    })
    .send({
      accesstoken,
      ...user._doc,
    });
};

module.exports = {
  createAccessToken,
  sendAccessToken,
};
