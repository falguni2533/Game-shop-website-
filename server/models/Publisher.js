const mongoose = require("mongoose");
const slugify = require("slugify");

/**
 * Publisher Schema
 * ----------------
 * Represents a game publisher
 * (e.g. Rockstar Games, Ubisoft, Electronic Arts, Riot Games).
 */
const publisherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Publisher name is required"],
      unique: true,
      trim: true,
      maxlength: [100, "Publisher name cannot exceed 100 characters"],
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save Middleware
 * --------------------
 * Automatically generates a unique slug from the publisher name.
 *
 * Example:
 * Rockstar Games        -> rockstar-games
 * Rockstar Games        -> rockstar-games-1
 * Rockstar Games        -> rockstar-games-2
 */
publisherSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("name")) return next();

    const baseSlug = slugify(this.name, {
      lower: true,
      strict: true,
    });

    let slug = baseSlug;
    let counter = 1;

    const Publisher = this.constructor;

    while (
      await Publisher.exists({
        slug,
        _id: { $ne: this._id },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
    next();
  } catch (error) {
    next(error);
  }
});

// Export Publisher Model
module.exports = mongoose.model("Publisher", publisherSchema);