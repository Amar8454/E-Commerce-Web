const backendDomain = "https://e-commerce-web-1-i6k6.onrender.com/";

exports.SummaryAPI = {
  signup: {
    url: `${backendDomain}/auth/signup`,
    method: "POST",
  },

  login: {
    url: `${backendDomain}/auth/login`,
    method: "POST",
  },

  userDetail: {
    url: `${backendDomain}/auth/user_details`,
    method: "GET",
  },

  userLoggOut: {
    url: `${backendDomain}/auth/user_logged`,
    method: "GET",
  },

  allUserShow: {
    url: `${backendDomain}/auth/all_user_show`,
    method: "GET",
  },

  changeUserRoleFunction: {
    url: `${backendDomain}/auth/update_user_role`,
    method: "POST",
  },

  uploadProduct: {
    url: `${backendDomain}/auth/upload_product`,
    method: "POST",
  },

  getAllProduct: {
    url: `${backendDomain}/auth/getAllUpload_Product`,
    method: "GET",
  },

  updateProduct: {
    url: `${backendDomain}/auth/update_product_details`,
    method: "POST",
  },

  getProductByCategory: {
    url: `${backendDomain}/auth/get_allProduct_Category`,
    method: "GET",
  },
  getCategoryWiseProduct: {
    url: `${backendDomain}/auth/category_wise_product`,
    method: "POST",
  },

  getProductDetiales: {
    url: `${backendDomain}/auth/get_Product_detiales`,
    method: "POST",
  },

  addProductInCart: {
    url: `${backendDomain}/auth/add_product_in_cart`,
    method: "POST",
  },

  getCountTotalAddCarts: {
    url: `${backendDomain}/auth/count_addCart_product`,
    method: "GET",
  },

  showAllCartProducts: {
    url: `${backendDomain}/auth/show_all_cart_product`,
    method: "GET",
  },

  updateAddCartProductQuanity: {
    url: `${backendDomain}/auth/updated_add_cart_quantity`,
    method: "PUT",
  },

  deleteAddCartProduct: {
    url: `${backendDomain}/auth/delete_cart_product`,
    method: "POST",
  },

  searchProductSection: {
    url: `${backendDomain}/auth/search_product_section`,
    method: "GET",
  },

  filtercatergoryProduct: {
    url: `${backendDomain}/auth/filter_category_product`,
    method: "POST",
  },
};
