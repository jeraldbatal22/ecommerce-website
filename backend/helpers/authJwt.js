const jwt = require('jsonwebtoken')

exports.signToken = (user) => {
  return jwt.sign({
    _id: user._id,
    email: user.email,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
  },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  )
}
