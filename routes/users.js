const express = require('express');
const {
  getUsers,
  createUser,
  getUser,
  updateCurrentUser,
  updateCurrentUserAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.patch('/me/avatar', updateCurrentUserAvatar);
router.patch('/me', updateCurrentUser);

module.exports = router;
