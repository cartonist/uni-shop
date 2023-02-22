"use strict";
const common_vendor = require("../../common/vendor.js");
const common_bus = require("../../common/bus.js");
const mixins_tabbarBadge = require("../../mixins/tabbar-badge.js");
require("../../store/store.js");
require("../../store/cart.js");
require("../../store/user.js");
if (!Array) {
  const _easycom_my_address2 = common_vendor.resolveComponent("my-address");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_my_goods2 = common_vendor.resolveComponent("my-goods");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_my_settle2 = common_vendor.resolveComponent("my-settle");
  (_easycom_my_address2 + _easycom_uni_icons2 + _easycom_my_goods2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_my_settle2)();
}
const _easycom_my_address = () => "../../components/my-address/my-address.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_my_goods = () => "../../components/my-goods/my-goods.js";
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_my_settle = () => "../../components/my-settle/my-settle.js";
if (!Math) {
  (_easycom_my_address + _easycom_uni_icons + _easycom_my_goods + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_my_settle)();
}
const __default__ = {
  mixins: [mixins_tabbarBadge.badgeMix]
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Cart",
  setup(__props) {
    const store = common_vendor.useStore();
    const total = common_vendor.computed$1(() => store.getters["cart/total"]);
    const options = common_vendor.ref([{
      text: "\u53D6\u6D88",
      style: {
        backgroundColor: "#d81e06"
      }
    }]);
    common_vendor.onBeforeMount(() => {
      common_bus.bus.on("radio-change", (data) => {
        store.commit("cart/updateGoodsState", data);
      });
      common_bus.bus.on("num-change", (val) => {
        store.commit("cart/updateGoodsCount", val);
      });
    });
    const setBadge = () => {
      if (total.value != 0) {
        common_vendor.index.setTabBarBadge({
          index: 2,
          text: total.value + ""
        });
      } else {
        common_vendor.index.removeTabBarBadge({
          index: 2
        });
      }
    };
    const deleteGoods = (item) => {
      store.commit("cart/removeGoodsById", item.goods_id);
    };
    common_vendor.watch(total, () => {
      setBadge();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(store).state.cart.cart.length != 0
      }, common_vendor.unref(store).state.cart.cart.length != 0 ? {
        b: common_vendor.p({
          type: "shop",
          size: "18"
        }),
        c: common_vendor.f(common_vendor.unref(store).state.cart.cart, (item, index, i0) => {
          return {
            a: "82f8d201-4-" + i0 + "," + ("82f8d201-3-" + i0),
            b: common_vendor.p({
              item,
              ["show-radio"]: true,
              ["show-num-box"]: true
            }),
            c: common_vendor.o(($event) => deleteGoods(item), index),
            d: "82f8d201-3-" + i0 + ",82f8d201-2",
            e: index
          };
        }),
        d: common_vendor.p({
          ["right-options"]: options.value
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-82f8d201"], ["__file", "D:/Program Download/miniprogram/uni-shop/pages/Cart/Cart.vue"]]);
wx.createPage(MiniProgramPage);
