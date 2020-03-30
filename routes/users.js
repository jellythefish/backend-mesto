const router = require('express').Router();
const {
  getUsers, getUser, updateUserInfo, updateUserPic,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserPic);

module.exports = router;