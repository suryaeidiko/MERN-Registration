const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//bcrypt password
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    const salt_round = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, salt_round);
    user.password = hash_password;
    return next();
  } catch (error) {
    return next(error);
  }
});

//json web token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_TOKEN_GEN,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//compare the password
userSchema.methods.comparePassword = async function (plainPassword) {
  const user = this;
  try {
    const isPasswordMatch = await bcrypt.compare(plainPassword, user.password);
    return isPasswordMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

const User = mongoose.model("User", userSchema);

module.exports = User;
