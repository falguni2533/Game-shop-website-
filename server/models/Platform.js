const mongoose = require('mongoose');
const slugify = require('slugify');
 
/**
 * Platform Schema
 * ---------------
 * Represents a gaming platform in the Game Shop application
 * (e.g. "PlayStation 5", "Xbox Series X", "PC").
 *
 * Fields:
 *  - name: Human-readable, unique platform name.
 *  - slug: URL-friendly identifier auto-generated from `name`.
 */
const platformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Platform name is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'Platform name cannot exceed 50 characters'],
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
 * Pre-save middleware
 * --------------------
 * Automatically (re)generates the `slug` field from `name`
 * whenever a platform is created or its name is modified.
 *
 * If the generated slug already exists on another document,
 * a numeric suffix (-1, -2, -3, ...) is appended until a
 * unique slug is found, preventing duplicate key errors.
 */
platformSchema.pre('save', async function (next) {
  try {
    if (this.isModified('name')) {
      const baseSlug = slugify(this.name, { lower: true, strict: true });
      let candidateSlug = baseSlug;
      let suffix = 1;
 
      // Keep checking until a unique slug is found,
      // excluding the current document from the check.
      while (
        await this.constructor.exists({
          slug: candidateSlug,
          _id: { $ne: this._id },
        })
      ) {
        candidateSlug = `${baseSlug}-${suffix}`;
        suffix += 1;
      }
 
      this.slug = candidateSlug;
    }
    next();
  } catch (error) {
    next(error);
  }
});
 
// Export the Platform model
const Platform = mongoose.model('Platform', platformSchema);
 
module.exports = Platform;
 
