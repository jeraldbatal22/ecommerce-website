const UserModel = require('./../models/User')
const bcrypt = require('bcryptjs');
const { signToken } = require('../helpers/authJwt');
exports.getAllUsers = async (req, res) => {
  const User = await UserModel
  User.find((err, data) => {
    if (err) {
      res.status(400).send({ message: err, status: 'error' })
    } else {
      res.status(200).send({ users: data, message: "Successfully get all users", status: 'sucess' })
    }
  });
}

exports.signupUser = async (req, res) => {
  const User = await UserModel;
  const { email, username, firstname, lastname, password } = req.body;
  const user = new User();
  user.email = email;
  user.username = username;
  user.firstname = firstname;
  user.lastname = lastname;
  user.password = bcrypt.hashSync(password);

  user.save((err, data) => {
    if (err) {
      res.status(400).send({ message: err, status: 'error' })
    } else {
      res.status(200).send({ message: 'Successfully Created User', status: 'success', product: data })
    }
  });
};

exports.authUser = async (req, res) => {
  // res.send({ message: 'sad' })
  const User = await UserModel
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = signToken(user);
    res.status(200).send({
      message: 'Successfully signin', status: 'success', user: {
        token,
        _id: user._id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
      }
    })
  } else if (!user) {
    res.send({ message: 'User is not exist', status: 'error' })
  } else {
    res.send({ message: 'Invalid user or password', status: 'error' })
  }
}

