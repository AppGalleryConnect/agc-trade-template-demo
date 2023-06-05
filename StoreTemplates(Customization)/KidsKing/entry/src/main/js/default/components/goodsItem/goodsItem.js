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
import { connectorId } from '../../pages/cart/constants'
import { debounce } from '../../utils/utils'
import { invokeWebView } from '../../common/invoke_webview';

export default {
  props: {
	isSell: false,
	goodsIndex: 0,
	goodsItem: {
	  ActualDeductAmt: 0,
	  ActualDeductScore: 0,
	  Attr: '',
	  BGoldReturn: 0,
	  Brand: 0,
	  BuyTime: 0,
	  CD: 0,
	  CList: [],
	  CPayment: 0,
	  Category: 0,
	  DType: 2,
	  Discount: 0,
	  Fare: 0,
	  GList: [],
	  Id: 0,
	  InstallmentInfo: '',
	  IsBGoldPro: 1,
	  IsCd: 1,
	  IsMA: 1,
	  IsPopBill: 0,
	  Max: 99,
	  Min: 1,
	  Num: 1,
	  OpInfo: '',
	  PCType: 0,
	  PLimit: 0,
	  PMNum: 0,
	  PName: '',
	  PType: 0,
	  Pay: 0,
	  Pic: '',
	  PmType: 0,
	  PmTypeName: '',
	  PopBillDesc: '',
	  PopPriceId: 0,
	  Price: 0,
	  PromotionId: 0,
	  Reason: '',
	  Refer: 0,
	  SId: 0,
	  SaleMode: 0,
	  ScoreDeductAmt: 0,
	  ScoreDeductScore: 0,
	  Sell: 0,
	  SerialId: '',
	  SingleFare: 0,
	  SingleLimit: 0,
	  Sort: 0,
	  State: 0,
	  StockNum: 0,
	  StockType: 0,
	  Tariff: 0,
	  Times: 0,
	  Title: "",
	  Type: 0,
	  UC: 0,
	  Weight: 0,
	},
	useless: false
  },

  data: {
	marginLeft: '0px'
  },

  computed: {
	hideMarginTop() {
	  return (this.isSell && this.goodsIndex === 0)
	},
  },


  onAttached() {
	// this.initAnimation()
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
	eventBus.emit('setPageLoading', false)
  },

  // 左滑
  handleSwipeItem(event) {
	if (event.direction === "left" && event.distance >= 30) {
	  this.marginLeft = `-41px`
	}
	if (event.direction === "right" && event.distance >= 30) {
	  this.marginLeft = `0px`
	}
  },

  // 找相似
  handleFindLike: debounce(function () {
	// todo
  }, 500, true),

  // 点击商品，跳转到商品详情页
  handleClickGoodsItem: debounce(function () {
	invokeWebView({
	  url: `https://w.cekid.com/item/${this.goodsItem.Id}.html?cmd=kwproduct&id=${this.goodsItem.Id}`
	})
  }, 500, true),

  // 删除按钮 打开删除弹窗
  handleDeleteGoods() {
	this.$element('dialogDelete').show()
  },

  handleCancelDelete() {
	this.$element('dialogDelete').close()
  },

  handleConfirmDelete() {
	const {eventBus, loginInfo} = this.$app.$def;
	eventBus.emit('setPageLoading', true)
	this.$element('dialogDelete').close()
	agconnect.lowCode().callConnector({
	  connectorId, methodName: "deleteGoods", params: JSON.stringify({
		uid: loginInfo.uid,
		skey: loginInfo.skey,
		p: this.goodsItem.Id
	  })
	}).then(res => {
	  this.commonSuccessFn(eventBus, res)
	}).catch(e => {
	  this.commonFailedFn(eventBus, e)
	});
  },

  // 数量减一
  handleMinusCount() {
	const {eventBus, loginInfo} = this.$app.$def;
	eventBus.emit('setPageLoading', true)
	agconnect.lowCode().callConnector({
	  connectorId, methodName: "minusCount", params: JSON.stringify({
		uid: loginInfo.uid,
		skey: loginInfo.skey,
		p: this.goodsItem.Id
	  })
	}).then(res => {
	  this.commonSuccessFn(eventBus, res)
	}).catch(e => {
	  this.commonFailedFn(eventBus, e)
	});
  },

  // 数量加一
  handlePlusCount() {
	const {eventBus, loginInfo} = this.$app.$def;
	eventBus.emit('setPageLoading', true)
	agconnect.lowCode().callConnector({
	  connectorId, methodName: "addCount", params: JSON.stringify({
		uid: loginInfo.uid,
		skey: loginInfo.skey,
		p: this.goodsItem.Id
	  })
	}).then(res => {
	  this.commonSuccessFn(eventBus, res)
	}).catch(e => {
	  this.commonFailedFn(eventBus, e)
	});
  },

  // 选中
  handleSelectGoods() {
	const {eventBus, loginInfo} = this.$app.$def;
	eventBus.emit('setPageLoading', true)
	agconnect.lowCode().callConnector({
	  connectorId, methodName: "selectGoods", params: JSON.stringify({
		uid: loginInfo.uid,
		skey: loginInfo.skey,
		p: this.goodsItem.Id
	  })
	}).then(res => {
	  this.commonSuccessFn(eventBus, res)
	}).catch(e => {
	  this.commonFailedFn(eventBus, e)
	});
  },

  // 取消选中
  handleUnselectGoods() {
	const {eventBus, loginInfo} = this.$app.$def;
	eventBus.emit('setPageLoading', true)
	agconnect.lowCode().callConnector({
	  connectorId, methodName: "unSelectGoods", params: JSON.stringify({
		uid: loginInfo.uid,
		skey: loginInfo.skey,
		p: this.goodsItem.Id
	  })
	}).then(res => {
	  this.commonSuccessFn(eventBus, res)
	}).catch(e => {
	  this.commonFailedFn(eventBus, e)
	});
  },
}
