"use strict";
const common_vendor = require("../../common/vendor.js");
const common_bus = require("../../common/bus.js");
const mixins_tabbarBadge = require("../../mixins/tabbar-badge.js");
require("../../store/store.js");
require("../../store/cart.js");
require("../../store/user.js");
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
if (!Math) {
  _easycom_my_search();
}
const __default__ = {
  mixins: [mixins_tabbarBadge.badgeMix]
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Cate",
  setup(__props) {
    const wh = common_vendor.ref(0);
    const cateList = common_vendor.ref([]);
    const cateLevel2 = common_vendor.ref([]);
    const active = common_vendor.ref(0);
    const scrollTop = common_vendor.ref(0);
    const getCateList = async () => {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/categories");
      if (res.meta.status == 200) {
        cateList.value = res.message;
        cateLevel2.value = res.message[0].children;
      }
    };
    const changeTab = (i) => {
      active.value = i;
      cateLevel2.value = cateList.value[i].children;
      scrollTop.value = scrollTop.value ? 0 : 1;
    };
    const goToGoodsList = (item) => {
      common_vendor.index.navigateTo({
        url: "/subpkg/Goods-list/Goods-list?cid=" + item.cat_id
      });
    };
    common_vendor.onBeforeMount(() => {
      const sync = common_vendor.index.getSystemInfoSync();
      wh.value = sync.windowHeight - 50;
      getCateList();
      common_bus.bus.on("jump", () => {
        common_vendor.index.navigateTo({
          url: "/subpkg/Search/Search"
        });
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(cateList.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.cat_name),
            b: common_vendor.n(active.value == i ? "active" : ""),
            c: common_vendor.o(($event) => changeTab(i), i),
            d: i
          };
        }),
        b: wh.value + "px",
        c: common_vendor.f(cateLevel2.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.cat_name),
            b: common_vendor.f(item.children, (item2, i2, i1) => {
              return {
                a: item2.cat_icon.replace("api-ugo-dev", "api-ugo-web"),
                b: common_vendor.t(item2.cat_name),
                c: i2,
                d: common_vendor.o(($event) => goToGoodsList(item2), i2)
              };
            }),
            c: i
          };
        }),
        d: wh.value + "px",
        e: scrollTop.value
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd643b52"], ["__file", "D:/Program Download/miniprogram/uni-shop/pages/Cate/Cate.vue"]]);
wx.createPage(MiniProgramPage);
