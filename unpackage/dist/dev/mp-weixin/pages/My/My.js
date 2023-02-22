"use strict";
const mixins_tabbarBadge = require("../../mixins/tabbar-badge.js");
const common_vendor = require("../../common/vendor.js");
require("../../store/store.js");
require("../../store/cart.js");
require("../../store/user.js");
const _sfc_main = {
  mixins: [mixins_tabbarBadge.badgeMix]
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Program Download/miniprogram/uni-shop/pages/My/My.vue"]]);
wx.createPage(MiniProgramPage);
