const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" является обязательным'],
    minlength: [2, 'Длина поля "name" должна быть больше 2 символов'],
    maxlength: [30, 'Длина поля "name" должна быть меньше 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Поле "about" является обязательным'],
    minlength: [2, 'Длина поля "about" должна быть больше 2 символов'],
    maxlength: [30, 'Длина поля "about" должна быть меньше 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле "avatar" является обязательным'],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
