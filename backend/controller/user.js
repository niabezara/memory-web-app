const mongoose = require("mongoose");
const userSchema = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signin user
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await userSchema.findOne({ email: email });
    if (!existinguser)
      return res.status(403).json({ message: "user not found" });

    // check password
    const correctPassword = await bcrypt.compare(
      password,
      existinguser.password
    );
    if (!correctPassword)
      return res.status(400).json({ message: "Invalid credentials." });

    // generate token
    const token = await jwt.sign(
      {
        email: existinguser.email,
        id: existinguser._id,
      },
      `${process.env.JWT_SECRET}`
    );
    res.status(200).json({ result: existinguser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// sign up user
const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existinguser = await userSchema.findOne({ email: email });
    if (existinguser)
      return res.status(400).json({ message: "User already exists." });
    if (password !== confirmPassword) {
      return res.status(404).json({ message: "password is incorrect" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userSchema.create({
      email: email,
      password: hashPassword,
      name: `${firstName}${lastName}`,
    });

    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "3h" }
    );
    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signIn, signUp };
