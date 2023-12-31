


const router = require('express').Router();
const { Thought } = require('../models');
const Reaction = require('../models/Reaction');

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, userId } = req.body;

    // Create a new reaction object using the Reaction subdocument schema
    const newReaction = new Reaction({
      reactionBody,
      userId
    });

    // Find the thought by its id and push the newReaction into the reactions array
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $push: { reactions: newReaction } },
      { new: true }
    )
    .populate({
      path: 'reactions',
      populate: { path: 'userId', select: 'username' }
    })
    .populate('userId', 'username');

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;

    // Find the thought by its id and pull the reaction with matching reactionId from the reactions array
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { reactionId } } },
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

module.exports = router;
