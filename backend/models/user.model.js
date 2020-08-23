const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // will trim whitespace at the end
    minlength: 3
  },
}, {
    timestamps: true, // will automatecally create fields for when was it created and modified
});
    
const User = mongoose.model('User', userSchema);

module.exports = User;