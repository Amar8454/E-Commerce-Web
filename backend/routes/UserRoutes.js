const express = require("express");
const {
  UserSignUp,
  UserLogin,
  UserProfielDeatials,
  UserLoggOut,
  AllUserShow,
  ChangeUserRoleAndUpdate,
  UploadProductData,
  GetProductData,
  UpdateUploadProduct,
  GetCategoryProductOne,
  getCategoryWiseProduct,
  getProductDetailes,
  AddProductInCart,
  getCountTotalAddCart,
  showAllAddCartProduct,
  updateAddCartProductQuantity,
  DeleteCartBtnProduct,
  SearchProductSection,
  filterCategoryProduct,
} = require("../controller/UserContr");
const { UserAuthen } = require("../middleware/UserAuth");

const router = express.Router();

router.post("/signup", UserSignUp);
router.post("/login", UserLogin);
router.get("/user_details", UserAuthen, UserProfielDeatials);
router.get("/user_logged", UserLoggOut);

// for upload product
router.post("/upload_product", UserAuthen, UploadProductData);
router.get("/getAllUpload_Product", GetProductData);
router.post("/update_product_details", UserAuthen, UpdateUploadProduct);
router.get("/get_allProduct_Category", GetCategoryProductOne);
router.post("/category_wise_product", getCategoryWiseProduct);
router.post("/get_Product_detiales", getProductDetailes);

//user add in cart
router.post("/add_product_in_cart", UserAuthen, AddProductInCart);
router.get("/count_addCart_product", UserAuthen, getCountTotalAddCart);
router.get("/show_all_cart_product", showAllAddCartProduct);
router.put(
  "/updated_add_cart_quantity",
  UserAuthen,
  updateAddCartProductQuantity
);
router.post("/delete_cart_product", DeleteCartBtnProduct);
router.get("/search_product_section", SearchProductSection);
router.post("/filter_category_product", filterCategoryProduct);
//for Admin
router.get("/all_user_show", UserAuthen, AllUserShow);
router.post("/update_user_role", UserAuthen, ChangeUserRoleAndUpdate);

module.exports = router;
