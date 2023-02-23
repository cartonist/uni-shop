"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
const store_store = require("./store/store.js");
require("./store/cart.js");
require("./store/user.js");
if (!Math) {
  "./pages/Home/Home.js";
  "./pages/Cart/Cart.js";
  "./pages/My/My.js";
  "./pages/Cate/Cate.js";
  "./subpkg/Goods-details/Goods-details.js";
  "./subpkg/Goods-list/Goods-list.js";
  "./subpkg/Search/Search.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("\u5F53\u524D\u7EC4\u4EF6\u4EC5\u652F\u6301 uni_modules \u76EE\u5F55\u7ED3\u6784 \uFF0C\u8BF7\u5347\u7EA7 HBuilderX \u5230 3.1.0 \u7248\u672C\u4EE5\u4E0A\uFF01");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Program Download/miniprogram/uni-shop/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_store.myStore);
  common_vendor.index.$http = common_vendor.$http;
  return {
    app
  };
}
common_vendor.index.$showMsg = (title = "\u6570\u636E\u8BF7\u6C42\u5931\u8D25", duration = 1500) => {
  common_vendor.index.showToast({
    title,
    duration,
    icon: "none"
  });
};
common_vendor.$http.baseUrl = "https://www.uinav.com";
common_vendor.$http.beforeRequest = function(option) {
  common_vendor.index.showLoading({
    title: "\u52A0\u8F7D\u4E2D..."
  });
  if (option.url.indexOf("/my/") != -1) {
    options.header = {
      Authorization: store_store.myStore.state.user.token
    };
  }
};
common_vendor.$http.afterRequest = function(option) {
  common_vendor.index.hideLoading();
  if (option.data.meta.status != 200) {
    common_vendor.index.$showMsg();
  }
};
createApp().app.mount("#app");
exports.createApp = createApp;
