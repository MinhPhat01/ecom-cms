const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Use the desired phone number validation logic here
        // For example, you can use regular expressions to validate the phone number format
        return /^\+?(?:\d{1,3})?[-. (]?\d{3}[-. )]?\d{3}[-. ]?\d{4}$/.test(
          value
        ); // Check if the phone number matches the desired format
      },
    },
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  date_updated: {
    type: Date,
    default: Date.now,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
