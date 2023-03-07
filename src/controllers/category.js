const { Category } = require("../models");
const slugify = require("slugify");
const shortid = require("shortid");

exports.addCategory = (req, res) => {
  const { name } = req.body;

  const categoryObj = {
    name,
    slug: `${slugify(name)}-${shortid.generate()}`,
  };

  let categoryPictures = [];

  if (req.files.length > 0) {
    categoryPictures = req.files.map((file) => {
      return { img: file.path };
    });
    categoryObj.categoryImage = [...categoryPictures];
  }

  const cate = new Category(categoryObj);
  cate.save((error, category) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

exports.getCategories = (req, res) => {
  Category.find({ isDisabled: { $ne: true } }).exec((error, categories) => {
    if (error) {
      return res.status(400).json({ error });
    } else {
      return res.status(200).json({ categories });
    }
  });
};

exports.getCategoryById = (req, res) => {
  const { _id } = req.body;
  if (_id) {
    Category.findOne({ _id, isDisabled: { $ne: true } }).exec(
      (error, category) => {
        if (error) return res.status(400).json({ error });
        if (category) {
          res.status(200).json({ category });
        } else {
          res.status(400).json({ error: "something went wrong" });
        }
      }
    );
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

exports.updateCategories = async (req, res) => {
  const { _id, name } = req.body;
  const category = {
    name,
  };

  await Category.findOneAndUpdate({ _id }, category, {
    new: true,
  });
  res.status(202).json({ message: "Category updated successfully" });
};
