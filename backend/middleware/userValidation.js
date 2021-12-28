const { isValidEmail } = require("./../helpers/validEmail");
const UserModel = require("./../models/User");

exports.checkSignupPayload = async (req, res, next) => {
  const User = await UserModel
  const { email, username, firstname, lastname, password } = req.body;
  const errors = []

  if (email === "") {
    errors.push('Email  is required ')
  } else {
    if (!isValidEmail(email)) {
      errors.push('Email is invalid')
    } else {
      const user = await User.findOne({ email: email })
      if (user !== null) {
        errors.push('Email is already exist')
      }
    }
  }

  if (username === "") {
    errors.push('Username is required ')
  } else {
    const user = await User.findOne({ username: username })
    if (user !== null) {
      errors.push('Username is already exist')
    }
  }

  if (firstname === "") {
    errors.push('Firstname is required')
  }

  if (lastname === "") {
    errors.push('Lastname is required')
  }

  if (password === "") {
    errors.push('Password is required')
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', errors: errors, message: 'Bad request' })
  };

  next();
}