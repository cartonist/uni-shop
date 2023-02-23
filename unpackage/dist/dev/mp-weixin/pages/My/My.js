"use strict";
const common_vendor = require("../../common/vendor.js");
const mixins_tabbarBadge = require("../../mixins/tabbar-badge.js");
require("../../store/store.js");
require("../../store/cart.js");
require("../../store/user.js");
if (!Array) {
  const _easycom_my_login2 = common_vendor.resolveComponent("my-login");
  const _easycom_my_userinfo2 = common_vendor.resolveComponent("my-userinfo");
  (_easycom_my_login2 + _easycom_my_userinfo2)();
}
const _easycom_my_login = () => "../../components/my-login/my-login.js";
const _easycom_my_userinfo = () => "../../components/my-userinfo/my-userinfo.js";
if (!Math) {
  (_easycom_my_login + _easycom_my_userinfo)();
}
const __default__ = {
  mixins: [mixins_tabbarBadge.badgeMix]
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "My",
  setup(__props) {
    const store = common_vendor.useStore();
    const token = common_vendor.computed$1(() => store.state.user.token);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(token)
      }, !common_vendor.unref(token) ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8f9a99c0"], ["__file", "D:/Program Download/miniprogram/uni-shop/pages/My/My.vue"]]);
wx.createPage(MiniProgramPage);
