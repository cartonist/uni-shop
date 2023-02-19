"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_my_goods2 = common_vendor.resolveComponent("my-goods");
  _easycom_my_goods2();
}
const _easycom_my_goods = () => "../../components/my-goods/my-goods.js";
if (!Math) {
  _easycom_my_goods();
}
const _sfc_main = {
  __name: "Goods-list",
  setup(__props) {
    const queryObj = common_vendor.ref({
      cid: "",
      query: "",
      pagenum: 1,
      pagesize: 10
    });
    const goodsList = common_vendor.ref([]);
    const total = common_vendor.ref(0);
    const isLoading = common_vendor.ref(false);
    common_vendor.onLoad((option) => {
      queryObj.value.cid = option.cid || "";
      queryObj.value.query = option.query || "";
      getGoodsList();
    });
    common_vendor.onReachBottom(() => {
      if (queryObj.value.pagenum * queryObj.value.pagesize >= total.value)
        return common_vendor.index.$showMsg("\u6570\u636E\u52A0\u8F7D\u5B8C\u6BD5");
      if (isLoading.value)
        return;
      queryObj.value.pagenum++;
      getGoodsList();
    });
    common_vendor.onPullDownRefresh(() => {
      queryObj.value.pagenum = 1;
      total.value = 0;
      isLoading.value = false;
      goodsList.value = [];
      getGoodsList(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    const getGoodsList = async (cb) => {
      isLoading.value = true;
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/goods/search", queryObj.value);
      isLoading.value = false;
      cb && cb();
      if (res.meta.status == 200) {
        goodsList.value = [...goodsList.value, ...res.message.goods];
        total.value = res.message.total;
      }
    };
    const goToGoodsDetails = (item) => {
      common_vendor.index.navigateTo({
        url: "/subpkg/Goods-details/Goods-details?goods_id=" + item.goods_id
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(goodsList.value, (item, index, i0) => {
          return {
            a: "c76bf854-0-" + i0,
            b: common_vendor.p({
              item
            }),
            c: index,
            d: common_vendor.o(($event) => goToGoodsDetails(item), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Program Download/miniprogram/uni-shop/subpkg/Goods-list/Goods-list.vue"]]);
wx.createPage(MiniProgramPage);
