"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../store/cart.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  (_easycom_uni_icons2 + _easycom_uni_goods_nav2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_goods_nav)();
}
const _sfc_main = {
  __name: "Goods-details",
  setup(__props) {
    const store = common_vendor.useStore();
    const goodsInfo = common_vendor.ref({});
    const options = common_vendor.ref([{
      icon: "shop",
      text: "\u5E97\u94FA",
      infoBackgroundColor: "#007aff",
      infoColor: "red"
    }, {
      icon: "cart",
      text: "\u8D2D\u7269\u8F66",
      info: 0
    }]);
    const buttonGroup = common_vendor.ref([
      {
        text: "\u52A0\u5165\u8D2D\u7269\u8F66",
        backgroundColor: "#ff0000",
        color: "#fff"
      },
      {
        text: "\u7ACB\u5373\u8D2D\u4E70",
        backgroundColor: "#ffa200",
        color: "#fff"
      }
    ]);
    const total = common_vendor.computed$1(() => store.getters["cart/total"]);
    common_vendor.watch(total, (val) => {
      const cartOption = options.value.find((item) => item.text == "\u8D2D\u7269\u8F66");
      if (cartOption) {
        cartOption.info = val;
      }
    }, {
      immediate: true
    });
    common_vendor.onLoad((option) => {
      const goodsId = option.goods_id;
      getGoodsInfo(goodsId);
    });
    const getGoodsInfo = async (goodsId) => {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/goods/detail", {
        goods_id: goodsId
      });
      if (res.meta.status == 200) {
        goodsInfo.value = res.message;
        goodsInfo.value.goods_introduce = goodsInfo.value.goods_introduce.replace(
          /<img/g,
          '<img style="display: block;"'
        ).replace(/webp/g, "jpg");
      }
    };
    const previewImg = (index) => {
      common_vendor.index.previewImage({
        current: index,
        urls: goodsInfo.value.pics.map((x) => x.pics_big)
      });
    };
    const onClick = (e) => {
      if (e.content.text == "\u8D2D\u7269\u8F66") {
        common_vendor.index.switchTab({
          url: "/pages/Cart/Cart"
        });
      }
    };
    const buttonClick = (e) => {
      const goods = {
        goods_id: goodsInfo.value.goods_id,
        goods_name: goodsInfo.value.goods_name,
        goods_price: goodsInfo.value.goods_price,
        goods_count: 1,
        goods_small_logo: goodsInfo.value.goods_small_logo,
        goods_state: true
      };
      if (e.content.text == "\u52A0\u5165\u8D2D\u7269\u8F66") {
        store.commit("cart/addToCart", goods);
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: goodsInfo.value.goods_name
      }, goodsInfo.value.goods_name ? {
        b: common_vendor.f(goodsInfo.value.pics, (item, index, i0) => {
          return {
            a: item.pics_big,
            b: common_vendor.o(($event) => previewImg(index), index),
            c: index
          };
        }),
        c: common_vendor.t(goodsInfo.value.goods_price.toFixed(2)),
        d: common_vendor.t(goodsInfo.value.goods_name),
        e: common_vendor.p({
          type: "star",
          size: 18,
          color: "gray"
        }),
        f: goodsInfo.value.goods_introduce,
        g: common_vendor.o(onClick),
        h: common_vendor.o(buttonClick),
        i: common_vendor.p({
          fill: true,
          options: options.value,
          buttonGroup: buttonGroup.value
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3bd2e652"], ["__file", "D:/Program Download/miniprogram/uni-shop/subpkg/Goods-details/Goods-details.vue"]]);
wx.createPage(MiniProgramPage);
