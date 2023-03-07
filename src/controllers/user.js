const { User } = require("../models");

exports.updateUserInfo = async (req, res) => {
  const { name } = req.body;
  const payload = { name };
  try {
    if (req.file) {
      payload.profilePicture = req.file.path;
    }
    const userObj = await User.findOneAndUpdate(
      { _id: req.user._id },
      { ...payload },
      { upsert: true }
    );
    if (userObj) {
      res.status(202).json({ message: "Updated successfully" });
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
