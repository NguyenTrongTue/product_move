const User = require("../models/User");
const createError = require("../../util/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken, sendAccessToken } = require("../../util/tokens");

class AuthController {
  // register
  register(req, res, next) {
    // create hash for password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, isAdmin: true, password: hash });
    newUser
      .save()
      .then((newUser) => {
        res.json(newUser);
      })
      .catch(next);
  }
  login(req, res, next) {
    const loginUser = async (req, res, next) => {
      try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found"));

        // compare upload password with encrypted password in db
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!isPasswordCorrect)
          return next(createError(400, "Wrong password or username"));
        // if 2 passwords match, generate 1 accesstoken
        const accessToken = createAccessToken(user._id, user.isAdmin);

        sendAccessToken(res, req, accessToken, user);
      } catch (err) {
        next(err);
      }
    };
    loginUser(req, res, next);
  }
  logout(req, res, next) {
    res.clearCookie("accessToken", { path: "/" });

    return res.send({
      message: "Logged out",
    });
  }
}

module.exports = new AuthController();
