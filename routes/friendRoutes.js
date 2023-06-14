const router = require('express').Router();
const { User } = require('../models');

// POST to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Update the user's friend list by pushing the friendId into the friends array
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Update the user's friend list by pulling the friendId from the friends array
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
