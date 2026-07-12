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
 * Auto-generate unique slug
 */
publisherSchema.pre("save", async function () {
  if (!this.isModified("name")) return;

  const baseSlug = slugify(this.name, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (
    await this.constructor.exists({
      slug,
      _id: { $ne: this._id },
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
});

// Export Publisher Model
module.exports = mongoose.model("Publisher", publisherSchema);