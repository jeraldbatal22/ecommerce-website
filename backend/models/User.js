const mongodb = require('../config/database')

const User = async () => {
  const { Schema, model } = await mongodb;
  const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Number, required: true, default: 0 },
    role: { type: Number, required: true, default: 0 },
  },
    {
      timestamps: true
    });
  return model('User', userSchema)
}

module.exports = User()