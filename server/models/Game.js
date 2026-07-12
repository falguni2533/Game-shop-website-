const mongoose = require("mongoose");
const slugify = require("slugify");

const systemRequirementsSchema = new mongoose.Schema(
  {
    os: { type: String, trim: true },
    processor: { type: String, trim: true },
    memory: { type: String, trim: true },
    graphics: { type: String, trim: true },
    storage: { type: String, trim: true },
  },
  { _id: false }
);

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Game title is required"],
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [200, "Short description cannot exceed 200 characters"],
    },

    fullDescription: {
      type: String,
      required: [true, "Full description is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
      index: true,
    },

    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],

    platforms: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Platform",
        },
      ],
      required: [true, "At least one platform is required"],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "At least one platform is required",
      },
    },

    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publisher",
      required: [true, "Publisher is required"],
      index: true,
    },

    releaseDate: {
      type: Date,
      required: [true, "Release date is required"],
    },

    coverImage: {
      type: String,
      required: [true, "Cover image is required"],
    },

    screenshotImages: {
      type: [String],
      default: [],
    },

    trailerUrl: {
      type: String,
      trim: true,
    },

    systemRequirements: {
      minimum: systemRequirementsSchema,
      recommended: systemRequirementsSchema,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    
    reviews: [
    {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    name: {
      type: String,
      required: [true, "Reviewer name is required"],
      trim: true,
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true,
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
  },
],

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    trending: {
      type: Boolean,
      default: false,
      index: true,
    },

    bestSeller: {
      type: Boolean,
      default: false,
      index: true,
    },

    stock: {
      type: Number,
      default: 9999,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual: computed final price after discount, never persisted
gameSchema.virtual("finalPrice").get(function () {
  return Math.round((this.price - (this.price * this.discount) / 100) * 100) / 100;
});

// Ensure virtuals are included when the document is converted to JSON/object
gameSchema.set("toJSON", { virtuals: true });
gameSchema.set("toObject", { virtuals: true });

// Text index for search feature (title + short description)
gameSchema.index({ title: "text", shortDescription: "text" });

// Auto-generate slug from title before saving, and keep it unique
gameSchema.pre("save", async function () {
  if (!this.isModified("title")) return;

  const baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  const Game = this.constructor;
  while (await Game.exists({ slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
});

module.exports = mongoose.model("Game", gameSchema);