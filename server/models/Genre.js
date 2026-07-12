const mongoose = require("mongoose");
const slugify = require("slugify");

/**
 * Genre Schema
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
 * Auto Generate Slug
 */
genreSchema.pre("save", async function () {
  if (!this.isModified("name")) return;

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
});

module.exports = mongoose.model("Genre", genreSchema);