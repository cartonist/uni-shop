"use strict";
const common_vendor = require("../../common/vendor.js");
const common_bus = require("../../common/bus.js");
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
if (!Math) {
  _easycom_my_search();
}
const _sfc_main = {
  __name: "Home",
  setup(__props) {
    const navList = common_vendor.ref([]);
    const swiperList = common_vendor.ref([]);
    const floorList = common_vendor.ref([]);
    const getSwiperList = async () => {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/home/swiperdata");
      if (res.meta.status == 200) {
        swiperList.value = res.message;
      }
    };
    const getNavList = async () => {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/home/catitems");
      if (res.meta.status == 200) {
        navList.value = res.message;
      }
    };
    const navClickHandler = (item) => {
      if (item.name == "\u5206\u7C7B") {
        common_vendor.index.switchTab({
          url: "/pages/Cate/Cate"
        });
      }
    };
    const getFloorList = async () => {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/home/floordata");
      if (res.meta.status == 200) {
        res.message.forEach((item) => {
          item.product_list.forEach((pro) => {
            pro.url = "/subpkg/Goods-list/Goods-list?" + pro.navigator_url.split("?")[1];
          });
        });
        floorList.value = res.message;
      }
      console.log(floorList.value);
    };
    common_vendor.onBeforeMount(() => {
      getSwiperList();
      getNavList();
      getFloorList();
      common_bus.bus.on("jump", () => {
        common_vendor.index.navigateTo({
          url: "/subpkg/Search/Search"
        });
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiperList.value, (item, index, i0) => {
          return {
            a: item.image_src,
            b: "../../subpkg/Goods-details/Goods-details?goods_id=" + item.goods_id,
            c: index
          };
        }),
        b: common_vendor.f(navList.value, (item, index, i0) => {
          return {
            a: item.image_src,
            b: common_vendor.o(($event) => navClickHandler(item))
          };
        }),
        c: common_vendor.f(floorList.value, (item, index, i0) => {
          return {
            a: item.floor_title.image_src,
            b: item.product_list[0].image_src,
            c: item.product_list[0].image_width + "rpx",
            d: item.product_list[0].url,
            e: common_vendor.f(item.product_list, (item2, i2, i1) => {
              return {
                a: item2.image_src,
                b: item2.image_width + "rpx",
                c: i2,
                d: i2 !== 0,
                e: item2.url
              };
            }),
            f: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7ffebbf4"], ["__file", "D:/Program Download/miniprogram/uni-shop/pages/Home/Home.vue"]]);
wx.createPage(MiniProgramPage);
