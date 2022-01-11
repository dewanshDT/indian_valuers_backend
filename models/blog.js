const mongoose = require("mongoose");
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorPhotoURL: {
    type: String,
    required: true,
  },
  authorID: {
    type: String,
    required: true,
  }
});

blogSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true, strict: true,
    });
  }

  next();
});

module.exports = mongoose.model("Blog", blogSchema)