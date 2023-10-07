const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require('crypto');
// const bcrypt = require('bcrypt');
const user = new Schema(
  {
   password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
    },
  avatarURL: String,
  token: String,
  }, { versionKey: false }
);
user.pre('save', async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash('md5').update(this.email).digest('hex');
    this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=monsterid`
  }
})

const User = mongoose.model("user", user);

module.exports = User;