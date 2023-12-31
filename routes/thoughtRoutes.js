
const router = require('express').Router();
const { User, Thought } = require('../models');

// GET to get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });
    res.json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET to get a single thought by its _id
router.get('/:thoughtId', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ...

router.post('/', async (req, res) => {
  
  try {
    const { thoughtText, userId } = req.body;

    // Create a new thought
    const newThought = new Thought({
      thoughtText,
      userId
    });

    // Validate the new thought
    const validationError = newThought.validateSync();
    if (validationError) {
      const errors = Object.values(validationError.errors).map((error) => error.message);
      return res.status(400).json({ errors });
    }

    // Save the new thought
    await newThought.save();

    // Find the user by their _id and push the new thought's _id to the thoughts array
    const foundUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(newThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});





// PUT to update a thought by its _id
router.put('/:thoughtId', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE to remove a thought by its _id
router.delete('/:thoughtId', async (req, res) => {
  try {
    const { thoughtId } = req.params;

    const deletedThought = await Thought.findByIdAndDelete(thoughtId);

    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Remove the thought's _id from the associated user's thoughts array
    await User.findOneAndUpdate(
      { thoughts: thoughtId },
      { $pull: { thoughts: thoughtId } }
    );

    res.json(deletedThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
