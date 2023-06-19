


const router = require('express').Router();
const { User } = require('../models');

// POST to add a new friend to a user's friend list
router.post('/:username/friends/:friendUsername', async (req, res) => {
  try {
    const { username, friendUsername } = req.params;

    // Find the user and friend by their usernames
    const [user, friend] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ username: friendUsername })
    ]);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    // Update the user's friend list by pushing the friend's _id into the friends array
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $push: { friends: friend._id } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE to remove a friend from a user's friend list
router.delete('/:username/friends/:friendUsername', async (req, res) => {
  try {
    const { username, friendUsername } = req.params;

    // Find the user and friend by their usernames
    const [user, friend] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ username: friendUsername })
    ]);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    // Update the user's friend list by pulling the friend's _id from the friends array
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $pull: { friends: friend._id } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
