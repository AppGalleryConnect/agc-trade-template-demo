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

import "@hw-agconnect/lowcode-harmony";
import agconnect from "@hw-agconnect/core-harmony";
import window from '@ohos.window';
import storage from '@system.storage';
import { connectorId } from '../../pages/cart/constants'

export default {
  data: {
	pageLoading: false,
	isEditing: false,
	cartDataListener: null,
	pageLoadingListener: null,
	windowClass: null,
	hasGiftNotGetNumber: 0,
	queryDelivery: '',
	cartData: {
	  data: {
		ActualDeductAmt: "",
		ActualDeductScore: "",
		BlockList: [],
		CDiscount: "",
		ChannelId: "",
		CurrentTime: "",
		Discount: "",
		EntityId: "",
		EntityName: "",
		IsBGold: "",
		IsCd: "",
		MixProList: [{}],
		Num: "",
		Pay: "",
		Price: "",
		ProPay: "",
		ReturnDesc: "",
		ScoreThreshold: "",
		TNum: "",
		TotalDiscount: "",
		TotalReturn: "",
		TotalScore: "",
		VCDiscount: "",
		Warning: ""
	  }, errmsg: "", errno: ""
	},
	notice: [{
	  msg: ''
	}],
  },
  computed: {
	effectCartBlockList() {
	  return this.cartData.data.BlockList.filter(item => +item.Type !== 99)
	},
	uselessCartBlockList() {
	  return this.cartData.data.BlockList.filter(item => +item.Type === 99)
	},
	showEmpty() {
	  return this.cartData.data?.BlockList?.length === 0 && !this.pageLoading
	},
  },
  onInit() {
	storage.get({
	  key: 'loginInfo',
	  success: loginInfoStr => {
		const res = JSON.parse(loginInfoStr)
		if (res && res.uid && res.skey) {
		  this.$app.$def.loginInfo.uid = res.uid;
		  this.$app.$def.loginInfo.skey = res.skey;
		  this.getCartListDispatch(res.uid, res.skey);
		  this.queryDeliveryTips()
		  this.getNoticeDispatch()
		}
	  },
	  fail: (code, data) => {
		this.pageLoading = false;
	  },
	})
  },
  onShow() {
	// 页面初始化时设置顶部状态栏初始颜色，模拟沉浸式效果
	window.getTopWindow().then(data => {
	  this.windowClass = data;
	  this.setStatusBarColor('#f4f4f4')
	})
	const eventBus = this.$app.$def.eventBus
	this.cartDataListener = eventBus.on('setPageCartData', this.setCartData)
	this.pageLoadingListener = eventBus.on('setPageLoading', this.setPageLoading)
  },
  onDestroy() {
	if (this.cartDataListener) {
	  this.$app.$def.eventBus.off('setPageCartData', this.setCartData)
	}
	if (this.pageLoadingListener) {
	  this.$app.$def.eventBus.off('setPageLoading', this.setPageLoading)
	}
  },
  getCartListDispatch(uid, skey) {
	// const { loginInfo } = this.$app.$def;
	this.setPageLoading(true)
	agconnect.lowCode().callConnector({
	  connectorId, methodName: "getCartOnLine", params: JSON.stringify({
		uid: uid,
		skey: skey,
		visitkey: `${new Date().valueOf()}`, // 传时间戳
	  })
	}).then(res => {
	  this.setPageLoading(false)
	  const ret = res.getValue().ret;
	  if (ret.code !== 0) {
		throw new Error(`cartData_____${JSON.stringify(ret)}`);
	  }
	  this.cartData = JSON.parse(res.getValue().response);
	}).catch(e => {
	  this.setPageLoading(false)
	});
  },
  setCartData(data) {
	const currentScrollHeight = this.$element('storeList').getScrollOffset().y
	this.cartData = data;
	// 数据重新赋值后滚动条会重置
	setTimeout(() => {
	  this.$element('storeList').scrollTo({
		duration: 0, position: currentScrollHeight
	  })
	}, 100)
  },
  setPageLoading(isLoading) {
	this.pageLoading = isLoading;
  },
  getNoticeDispatch() {
	agconnect.lowCode().callDataModel({
	  modelId: "1157219914898013889", methodName: "list", status: 0, params: {}
	}).then(res => {
	  const ret = res.getValue().ret;
	  if (ret.code !== 0) {
		throw new Error(JSON.stringify(ret));
	  }
	  this.notice = res.getValue().data.records;
	}).catch(e => {
	  console.error(`getNoticeDispatch error, ${JSON.stringify(e)}`)
	});
  },
  // 设置系统状态栏背景色
  setStatusBarColor(statusBarColor) {
	this.windowClass.setSystemBarProperties({
	  statusBarColor
	});
  },
  // 显示运费弹窗
  handleShowTransportDialog() {
	if (this.queryDelivery) {
	  this.$element('dialogTransport').show()
	}
  },
  // 关闭运费弹窗
  handleHideTransportDialog() {
	this.$element('dialogTransport').close()
  },
  // 切换编辑状态
  handleToggleEditing() {
	this.isEditing = !this.isEditing
  },
  queryDeliveryTips() {
	agconnect.lowCode().callConnector({
	  connectorId, methodName: "queryDeliveryTips", params: JSON.stringify({})
	}).then(res => {
	  this.queryDelivery = JSON.parse(res.getValue().response)?.deliveryTips
	}).catch(e => {
	  console.error(`queryDeliveryTips error, ${JSON.stringify(e)}`)
	});
  },
}