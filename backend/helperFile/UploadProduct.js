const UserModel = require("../schemas/UserSchemas");

exports.UploadProduct = async (req, res, userId) => {
  const user = await UserModel.findById(userId);

  if (req.user !== "ADMIN") {
    return false;
  }
  return true;
};
