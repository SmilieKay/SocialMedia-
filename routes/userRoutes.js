// const router = require('express').Router();
// const { User, Thought } = require('../models');


// // GET all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find().populate('thoughts').populate('friends');
//     res.json(users);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });



// // GET a single user by their username and populated thought and friend data
// router.get('/username/:username', async (req, res) => {
//   try {
//     const { username } = req.params;
//     const user = await User.findOne({ username }).populate('thoughts').populate('friends');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });



// // POST a new user
// router.post('/', async (req, res) => {
//   try {
//     const { username, email } = req.body;

//     const newUser = await User.create({ username, email });
//     res.json(newUser);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // PUT to update a user by its _id
// router.put('/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { username, email } = req.body;

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { username, email },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(updatedUser);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


// // DELETE to remove a user by their username
// router.delete('/username/:username', async (req, res) => {
//   try {
//     const { username } = req.params;

//     const deletedUser = await User.findOneAndDelete({ username });

//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Remove the user's associated thoughts
//     await Thought.deleteMany({ username: deletedUser.username });

//     // Remove the user from any friend lists
//     await User.updateMany({ friends: deletedUser._id }, { $pull: { friends: deletedUser._id } });

//     res.json(deletedUser);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });




// module.exports = router;

const router = require('express').Router();
const { User, Thought } = require('../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single user by its username and populated thought and friend data
router.get('/username/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).populate('thoughts').populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;

    const newUser = await User.create({ username, email });
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT to update a user by its _id
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
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

// GET a single user by their _id and populated thought and friend data
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('thoughts').populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// DELETE to remove a user by its _id
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the user's associated thoughts
    await Thought.deleteMany({ username: deletedUser.username });

    // Remove the user from any friend lists
    await User.updateMany({ friends: deletedUser._id }, { $pull: { friends: deletedUser._id } });

    res.json(deletedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

