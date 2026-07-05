const mongoose = require("mongoose");
const slugify = require("slugify");

/**
 * wow i am going good! proud of mee!
 * Genre Schema
 * ------------
 * Represents a game genre (e.g. Action, Adventure, RPG, Strategy).
 */
const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Genre name is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Genre name cannot exceed 50 characters"],
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
 * Automatically generates a unique slug from the genre name.
 *
 * Example:
 * RPG      -> rpg
 * RPG      -> rpg-1
 * RPG      -> rpg-2
 */
genreSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("name")) return next();

    const baseSlug = slugify(this.name, {
      lower: true,
      strict: true,
    });

    let slug = baseSlug;
    let counter = 1;

    const Genre = this.constructor;

    while (
      await Genre.exists({
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

// Export Genre Model
module.exports = mongoose.model("Genre", genreSchema);