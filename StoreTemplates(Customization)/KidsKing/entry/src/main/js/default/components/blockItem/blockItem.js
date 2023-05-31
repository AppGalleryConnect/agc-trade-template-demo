/*
 * Copyright 2023. Huawei Technologies Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import agconnect from "@hw-agconnect/core-harmony";
import { invokeWebView } from '../../common/invoke_webview';
import { connectorId } from '../../pages/cart/constants'
import { debounce } from '../../utils/utils'

export default {
  props: {
	blockItem: {
	  DType: "",
	  Discount: "",
	  DistancePrice: "",
	  FDesc: "",
	  FType: "",
	  Fare: "",
	  GetTickets: "",
	  GoodShop: "",
	  IsCd: "",
	  Items: [{}],
	  MixProList: [{
		CouponList: [{
		  CouponMd5: "", Num: ""
		}],
		Desc: "",
		Id: "",
		Items: {
		  Items: [{
			Id: "",
			Num: "",
			PName: "",
			Pic: "",
			Price: "",
			Refer: "",
			Sell: "",
			Title: ""
		  }]
		},
		PmTimes: "",
		Type: ""
	  }],
	  Msg: "",
	  Name: "",
	  No: "",
	  Num: "",
	  Price: "",
	  SType: "",
	  Source: "",
	  StockType: "",
	  SubList: [{
		Discount: "",
		IsCd: "",
		Items: [{
		  ActualDeductAmt: "",
		  ActualDeductScore: "",
		  Attr: "",
		  Brand: "",
		  BuyTime: "",
		  CD: "",
		  CList: [{}],
		  CPayment: "",
		  Category: "",
		  DType: "",
		  Discount: "",
		  Fare: "",
		  GList: [{}],
		  Id: "",
		  InstallmentInfo: "",
		  IsCd: "",
		  Min: "",
		  Num: "",
		  OpInfo: "",
		  PCType: "",
		  PLimit: "",
		  PMNum: "",
		  PName: "",
		  PType: "",
		  Pay: "",
		  Pic: "",
		  PmType: "",
		  PmTypeName: ""
		}],
		Msg: "",
		Name: "",
		No: "",
		Num: "",
		Price: "",
		SubList: [{}],
		Type: "",
		Url: ""
	  }],
	  Threshold: "",
	  Type: "",
	  Url: ""
	},
  },

  data: {},

  computed: {},
  // 获取需要显示的赠品
  getGiftList(GList) {
	if (!GList || GList.length === 0) return []
	return GList.filter(item => item.Select === 1);
  },
  // 获取顶部促销块右侧的文本显示
  getSellExtraText(PmType, PmTimes, gList) {
	// 换购
	if (PmType === 3) {
	  if (PmTimes === 0) return '去换购';
	  const hasChosen = gList.some(item => item.Select === 1)
	  return hasChosen ? '重新换购' : '去换购'
	}
	// 满减 组合
	return PmTimes > 0 ? '再逛逛' : '去凑单'
  },
  // 点击顶部促销块右侧的文本按钮 去换购、重新换购、再逛逛、去凑单
  handleClickSellInfoRightBtn: debounce(function (subListItem) {
	const { PmType, PmTimes, Id } = subListItem;
	// 再逛逛
	if (PmType !== 3 && PmTimes > 0) {
	  invokeWebView({
		url: `https://so.cekid.com/home.html#/result/product/mall?ruleid=${Id}`
	  })
	}
  }, 500, true),
  // 获取融合促销块右侧的文本显示
  getMixSellExtraText(Type, PmTimes, GList) {
	if (Type === 26) {
	  return '查看红包'
	}
	if (this.getGiftList(GList).length > 0) {
	  return '重新选择'
	}
	return PmTimes > 0 ? '领赠品' : '查看赠品'
  },
  // 点击商家名称跳转到url
  handleClickStoreTitle: debounce(function (url) {
	if (!url) return;
	invokeWebView({
	  url
	});
  }, 500, true),
  // 点击BlockItem的右侧小按钮
  handleClickStoreRightIcon() {
	const {Type, PmTimes} = this.blockItem;
	// 跨店
	if (Number(Type) === 1) {
	  if (PmTimes > 0) {
		// 再逛逛
	  } else {
		// 去凑单
	  }
	}
	// 商家 显示运费弹窗
	if (Number(Type) === 2) {
	  this.$emit('showTransportDialog');
	}
  },
  // 选中商家下所有商品
  handleSelectBlock() {
	const {eventBus, loginInfo} = this.$app.$def;
	eventBus.emit('setPageLoading', true)
	agconnect.lowCode().callConnector({
	  connectorId, methodName: "selectShopAll", params: JSON.stringify({
		uid: loginInfo.uid,
		skey: loginInfo.skey,
		shopid: this.blockItem.No
	  })
	}).then(res => {
	  this.commonSuccessFn(eventBus, res)
	}).catch(e => {
	  this.commonFailedFn(eventBus, e)
	});
  },
  // 取消选中商家下所有商品
  handleUnselectBlock() {
	const {eventBus, loginInfo} = this.$app.$def;
	eventBus.emit('setPageLoading', true)
	agconnect.lowCode().callConnector({
	  connectorId, methodName: "unSelectShopAll", params: JSON.stringify({
		uid: loginInfo.uid,
		skey: loginInfo.skey,
		shopid: this.blockItem.No
	  })
	}).then(res => {
	  this.commonSuccessFn(eventBus, res)
	}).catch(e => {
	  this.commonFailedFn(eventBus, e)
	});
  },
  // 接口成功回调
  commonSuccessFn(eventBus, res) {
	eventBus.emit('setPageLoading', false)
	const ret = res.getValue().ret;
	if (ret.code !== 0) {
	  throw new Error(`${JSON.stringify(ret)}`);
	}
	eventBus.emit('setPageCartData', JSON.parse(res.getValue().response))
  },
  // 接口失败回调
  commonFailedFn(eventBus, err) {
	console.info(`cartData e, ${JSON.parse(err)}`)
	eventBus.emit('setPageLoading', false)
  },
  // 快速清理
  handleQuickDelete() {
	const {eventBus, loginInfo} = this.$app.$def;
	this.$element('dialogDelete').close()
	eventBus.emit('setPageLoading', true)

	const ids = this.blockItem.Items.map(item => item.Id).join(',')

	agconnect.lowCode().callConnector({
	  connectorId, methodName: "deleteGoods", params: JSON.stringify({
		uid: loginInfo.uid,
		skey: loginInfo.skey,
		p: ids
	  })
	}).then(res => {
	  this.commonSuccessFn(eventBus, res)
	  this.$emit('toggleEditing')
	}).catch(e => {
	  this.commonFailedFn(eventBus, e)
	});
  }
}
