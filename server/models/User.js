const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Did a really good job todayyy!1 6-7
// User Schema
const userSchema = new mongoose.Schema(
  {
    // Full name of the user
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Email address of the user (must be unique)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Hashed password (hidden by default)
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    // Role of the user (user or admin)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Optional avatar/profile image URL
    avatar: {
      type: String,
      default: "",
    },

    // Whether the user's email has been verified
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
module.exports = mongoose.model("User", userSchema);