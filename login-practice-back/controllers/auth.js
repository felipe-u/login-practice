const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "secretkey123";

exports.register = (req, res, next) => {
  // Se recuperan los datos del front
  const name = req.body.name;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password);
  const newUser = new User({ name: name, email: email, password: password });

  // Función mongoose
  newUser
    .save()
    .then(() => {
      // dataUser solo almacena información no sensible
      const dataUser = {
        name: newUser.name,
        email: newUser.email,
      };
      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ id: newUser._id }, SECRET_KEY, {
        expiresIn: expiresIn,
      });
      res.status(201).json({
        success: true,
        message: "User registered successfully!",
        token: accessToken,
        expiresIn: expiresIn,
        user: dataUser,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(409).json({
          success: false,
          message: "User already registered",
          error: err.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error registering user",
          error: err.message,
        });
      }
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: "Error comparing passwords" });
        }
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" });
        }
        const dataUser = {
          name: user.name,
          email: user.email,
        };
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, {
          expiresIn: expiresIn,
        });
        res.status(200).json({
          success: true,
          message: "User logged in successfully!",
          token: accessToken,
          expiresIn: expiresIn,
          user: dataUser,
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error logging in user" });
    });
};
