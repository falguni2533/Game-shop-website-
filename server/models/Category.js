const mongoose = require("mongoose");
const slugify = require("slugify");

/**
 * Category Schema
 * ----------------
 * Represents a game category (e.g. Action, RPG, Racing, MOBA).
 */
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Category name cannot exceed 50 characters"],
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
 * Automatically generates a unique slug from the category name.
 *
 * Example:
 * Action    -> action
 * Action    -> action-1
 * Action    -> action-2
 */
categorySchema.pre("save", async function (next) {
  if (!this.isModified("name")) return next();

  const baseSlug = slugify(this.name, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let counter = 1;

  const Category = this.constructor;

  while (await Category.exists({ slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
  next();
});

// Export Category Model
module.exports = mongoose.model("Category", categorySchema);