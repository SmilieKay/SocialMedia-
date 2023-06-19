// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const ReactionSchema = new Schema({
//   reactionId: {
//     type: Schema.Types.ObjectId,
//     default: () => new mongoose.Types.ObjectId()
//   },
//   reactionBody: {
//     type: String,
//     required: true,
//     maxlength: 280
//   },
//   username: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     get: timestamp => dateFormat(timestamp)
//   }
// });

// // Getter method to format the timestamp
// function dateFormat(timestamp) {
//   return new Date(timestamp).toLocaleDateString();
// }

// module.exports = ReactionSchema;


const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  }
});

// Getter method to format the timestamp
function dateFormat(timestamp) {
  return new Date(timestamp).toLocaleDateString();
}

const Reaction = mongoose.model('Reaction', ReactionSchema);

module.exports = Reaction;
