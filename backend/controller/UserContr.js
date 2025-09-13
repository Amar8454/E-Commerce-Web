const UserModel = require("../schemas/UserSchemas");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const { error } = require("console");
const ProductModel = require("../schemas/UploadProductSchema");
const { UploadProduct } = require("../helperFile/UploadProduct");
const AddProductModel = require("../schemas/AddProductCart");

exports.UserSignUp = async (req, res) => {
  try {
    const { name, email, password, profilePic } = req.body;
    if (!name || !email || !password) {
      return res.json({ message: "All Field are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        error: true,
        message: "User Allready exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashPassword,
      profilePic,
      role: "GENERAL",
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      error: false,
      message: "User created Successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      error: true,
      message: error,
    });
  }
};

exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All field are required" });
    }
    const user = await UserModel.findOne({ $or: [{ password }, { email }] });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "User not found" });
    }

    const userData = await bcrypt.compare(password, user.password);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, error: true, message: " Invailid Password" });
    }

    if (userData) {
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "2hr" }
      );

      const tokenOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      };

      res.cookie("token", token, tokenOptions).status(200).json({
        message: "User Login Successfully",
        data: token,
        success: true,
        error: false,
      });
    }
  } catch (error) {
    return res.json({ success: false, error: true, message: error.message });
  }
};

exports.UserLoggOut = async (req, res) => {
  try {
    res.clearCookie("token");

    return res
      .status(200)
      .json({ message: " User LoggOut ", success: true, error: false });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
};

exports.UserProfielDeatials = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User details",
      data: user,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

exports.AllUserShow = async (req, res) => {
  try {
    const findUser = await UserModel.find();
    if (!findUser) {
      return res.status(404).json({ message: "User not Found" });
    }
    return res.status(200).json({
      message: "AllUsers",
      success: true,
      error: false,
      data: findUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
};

exports.ChangeUserRoleAndUpdate = async (req, res) => {
  try {
    const sessionUser = req.userId;
    const { userId, role, email, name } = req.body;

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const user = await UserModel.find({ sessionUser });
    const updateUserRole = await UserModel.findByIdAndUpdate(userId, payload);

    return res.status(200).json({
      message: "User Role Updated",
      success: true,
      error: false,
      data: updateUserRole,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

exports.UploadProductData = async (req, res) => {
  try {
    const sessionId = req.userId;

    if (!UploadProduct(sessionId)) {
      throw new Error("Permission denied");
    }
    const {
      product,
      brandName,
      category,
      price,
      sellingPrice,
      uploadProductImage,
      description,
    } = req.body;

    const createNewproduct = new ProductModel({
      product,
      brandName,
      category,
      price,
      sellingPrice,
      uploadProductImage,
      description,
    });

    await createNewproduct.save();

    return res.status(200).json({
      message: "Product Uploaded",
      success: true,
      error: false,
      data: createNewproduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

exports.GetProductData = async (req, res) => {
  try {
    const allProduct = await ProductModel.find().sort({ createAt: -1 });

    if (!allProduct) {
      return res.status(404).json({ message: "Product Not Uploaded" });
    }

    return res.status(200).json({
      message: "All Product",
      success: true,
      error: false,
      data: allProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

exports.UpdateUploadProduct = async (req, res) => {
  try {
    const sessionId = req.userId;

    if (!UploadProduct(sessionId)) {
      throw new Error("Permission denied");
    }

    const { _id, ...reqBody } = req.body;
    const updateData = await ProductModel.findByIdAndUpdate(_id, reqBody);

    return res.status(200).json({
      message: "Product Updated",
      data: updateData,
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

exports.GetCategoryProductOne = async (req, res) => {
  try {
    const productCategory = await ProductModel.distinct("category");
    const productByCategory = [];

    for (const category of productCategory) {
      const product = await ProductModel.findOne({ category });
      if (product) {
        productByCategory.push(product);
      }
    }
    res.status(200).json({
      message: "category product",
      data: productByCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

exports.getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    const product = await ProductModel.find({ category });

    res.status(200).json({
      message: "category product",
      data: product,
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

exports.getProductDetailes = async (req, res) => {
  try {
    const { productId } = req.body;
    const productID = await ProductModel.findById(productId);

    res.status(200).json({
      message: "Get product",
      data: productID,
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

exports.AddProductInCart = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const AddProduct = await AddProductModel.findOne({ productId });
    if (AddProduct) {
      return res.status(404).json({
        message: "Already exits is Add to cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const AddNewData = new AddProductModel(payload);
    await AddNewData.save();

    res.status(200).json({
      message: "Product Added",
      data: AddNewData,
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

exports.getCountTotalAddCart = async (req, res) => {
  try {
    const userId = req.userId;

    const countAddCart = await AddProductModel.countDocuments({
      userId: userId,
    });

    res.json({
      data: countAddCart,
      message: "Ok",
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

exports.showAllAddCartProduct = async (req, res) => {
  try {
    const currentUser = req?.userId;
    const allProduct = await AddProductModel.find({ currentUser }).populate(
      "productId"
    );

    res.json({
      data: allProduct,
      message: "Show Cart",
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

exports.updateAddCartProductQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const updateById = req.body._id;
    const qty = req.body.quantity;

    const updateAddCart = await AddProductModel.findOneAndUpdate(
      { _id: updateById, userId },
      { $inc: { quantity: qty } },
      { new: true }
    );

    res.json({
      data: updateAddCart,
      message: "Quantity Updated",
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

exports.DeleteCartBtnProduct = async (req, res) => {
  try {
    const deleteAddCart = req.body._id;
    const deleteAddCartProduct = await AddProductModel.deleteOne({
      _id: deleteAddCart,
    });

    res.json({
      data: deleteAddCartProduct,
      message: "Product deleted",
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

exports.SearchProductSection = async (req, res) => {
  try {
    const query = req.query.q;
    const regExp = new RegExp(query, "i", "g");

    const product = await ProductModel.find({
      $or: [
        {
          product: regExp,
        },
        {
          category: regExp,
        },
      ],
    });

    res.json({
      data: product,
      message: "Search",
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

exports.filterCategoryProduct = async (req, res) => {
  try {
    const categoryList = req.body.category || [];
    const productCategory = await ProductModel.find({
      category: {
        $in: categoryList,
      },
    });

    res.json({
      data: productCategory,
      message: "checked",
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};
