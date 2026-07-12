const mongoose = require("mongoose");
const slugify = require("slugify");

/**
 * Platform Schema
 * ---------------
 * Represents a gaming platform
 * (e.g. PlayStation 5, Xbox Series X, PC).
 */
const platformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Platform name is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Platform name cannot exceed 50 characters"],
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
platformSchema.pre("save", async function () {
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

// Export Platform Model
module.exports = mongoose.model("Platform", platformSchema);