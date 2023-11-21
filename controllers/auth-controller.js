const User = require("../models/user-models");

// ----------------------
//   Home Page response
// ----------------------

const home = async (req, res) => {
  try {
    res.status(200).send("This is home page");
  } catch (error) {
    res.status(400).send("Data not Provided");
  }
};
//    -----------------------------
//     registration page response
//    -----------------------------

const registration = async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ msg: "email already exist" });
    }
    const userCreate = await User.create({ username, email, mobile, password });
    res
      .status(200)
      .json({
        message: "User is successfully registered",
        userId : userCreate._id.toString(),
        token : await userCreate.generateToken(),
      });
  } catch (error) {
    res.status(500).json("internal server error");
  }
};


//    ----------------------
//     login page response
//    ----------------------

const login = async (req, res) => {
    try {
      const {email, password} = req.body;
      const userexist = await User.findOne( {email} );

      if (!userexist) {
        return res.status(400).json("Invalid credentials");
      }
      // const isPasswordValid = await bcrypt.compare(password, userexist.password);
      const isPasswordValid = await userexist.comparePassword(password);

      if (isPasswordValid) {
        return res.status(200)
        .json({
          message : "login successful",
          userId : userexist._id.toString(),
          token : await userexist.generateToken(),
        })
      }else{
        return res.status(401).json({message : "invalid email or password"});
      }

    } catch (error) {
      return res.status(500).json("internal server error");
    }
}


// const registration = async(req, res) => {
//     try {
//         res.status(200)
//         .json({message : req.body})
//     } catch (error) {
//         res.status(400)
//         .send("Please provide credientials")
//     }
// }

module.exports = { home, registration, login };
