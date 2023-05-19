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
import { invokeWebView } from '../../common/invoke_webview';

export default {
  props: {
	isEditing: false,
	cartData: {
	  IsCd: 0,
	  Num: 0,
	  Price: 0,
	  TotalDiscount: 0,
	  OverseaList: {
		CouponBatchs: '', Num: 0, SkuIds: '', TotalPrice: 0
	  },
	  LocalList: {
		CouponBatchs: '', Num: 0, SkuIds: '', TotalPrice: 0
	  },
	}
  },
  data: {
	showCheapDialog: false,
	showDiffBuyDialog: false
  },
  computed: {
	// 合计应付
	showTotal() {
	  return this.cartData.Price - this.cartData.TotalDiscount
	},
	// 是否有优惠券
	hasCoupon() {
	  return Boolean(this.cartData?.OverseaList?.CouponBatchs || this.cartData?.LocalList?.CouponBatchs)
	},
	// 是否需要分开结算
	needSpiltSubmit() {
	  return this.cartData?.OverseaList?.Num > 0 && this.cartData?.LocalList?.Num > 0
	},
	// 是否有赠品未领取
	hasGiftNotGet() {
	  // 遍历所有 BlockList 下面的 MixProList ，先筛选出 满赠(Type=2) && 达标(PmTimes>0) 的数据
	  // 如果有，则遍历该 MixProList.GList，如果其中 Select 的数量小于 GLimit，则弹出赠品未领取的提示
	  const allowMixList = []
	  this.cartData.BlockList.forEach(item => {
		item.MixProList?.forEach(mixItem => {
		  if (mixItem.Type === 2 && mixItem.PmTimes > 0) {
			allowMixList.push(mixItem)
		  }
		})
	  })
	  let num = 0; // 有多少个赠品未领取
	  for (let i = 0; i < allowMixList.length; i++) {
		let count = 0; // 已领取的赠品
		allowMixList[i].GList?.forEach(giftItem => {
		  count += Number(giftItem.Select)
		})
		num += allowMixList[i].GLimit - count
	  }
	  return num;
	}
  },
  handleToggleCheapDialog() {
	this.showCheapDialog = !this.showCheapDialog;
  },
  handleDoNothing() {
	// 空func 临时解决点击穿透问题
  },
  handleToggleDiffBuyDialog() {
	this.showDiffBuyDialog = !this.showDiffBuyDialog;
  },
  // 去结算按钮
  handleClickBuyBtn() {
	// 判断是否显示分开结算弹窗
	if (this.needSpiltSubmit) {
	  return this.handleToggleDiffBuyDialog()
	}
	// 判断是否有赠品
	if (this.hasGiftNotGet) {
	  return this.handleShowGiftDialog()
	}
	this.jumpToBuyPage()
  },
  jumpToBuyPage() {
	invokeWebView({
	  url: 'https://w.cekid.com/order-confirm.html?cmd=kworderconfirm'
	});
  },
  // 分开结算-global
  handleBuyGlobalGoods() {
	// 调用一下取消勾选接口，把LocalList的商品取消勾选
	const {loginInfo} = this.$app.$def;
	agconnect.lowCode().callConnector({
	  connectorId, methodName: "unSelectGoods", params: JSON.stringify({
		uid: loginInfo.uid,
		skey: loginInfo.skey,
		p: this.cartData?.LocalList.SkuIds,
	  })
	}).then(res => {
	  this.jumpToBuyPage()
	}).catch(e => {
	  console.error(`cartData e, ${JSON.parse(e)}`)
	});
  },
  // 分开结算-local
  handleBuyLocalGoods() {
	// 调用一下取消勾选接口，把LocalList的商品取消勾选
	const {eventBus, loginInfo} = this.$app.$def;
	agconnect.lowCode().callConnector({
	  connectorId, methodName: "unSelectGoods", params: JSON.stringify({
		uid: loginInfo.uid,
		skey: loginInfo.skey,
		p: this.cartData?.OverseaList.SkuIds,
	  })
	}).then(res => {
	  this.jumpToBuyPage()
	}).catch(e => {
	  console.error(`cartData e, ${JSON.parse(e)}`)
	});
  },
  // 赠品弹窗
  handleShowGiftDialog() {
	this.$element('dialogGift').show()
  },
  // 放弃赠品
  handleGiveUpGift() {
	this.jumpToBuyPage()
  },
  // 去领取赠品
  handleGetGift() {
	this.$element('dialogGift').close()
  },
  formatNum(num) {
	return parseFloat((num / 100).toFixed(2))
  },

  // 选中所有商品
  handleSelectAll() {
	const {eventBus, loginInfo} = this.$app.$def;
	eventBus.emit('setPageLoading', true)
	agconnect.lowCode().callConnector({
	  connectorId, methodName: "selectAllGoods", params: JSON.stringify({
		uid: loginInfo.uid,
		skey: loginInfo.skey,
	  })
	}).then(res => {
	  this.commonSuccessFn(eventBus, res)
	}).catch(e => {
	  this.commonFailedFn(eventBus, e)
	});
  },
  // 取消选中所有商品
  handleUnselectAll() {
	const {eventBus, loginInfo} = this.$app.$def;
	eventBus.emit('setPageLoading', true)
	agconnect.lowCode().callConnector({
	  connectorId, methodName: "unSelectAllGoods", params: JSON.stringify({
		uid: loginInfo.uid,
		skey: loginInfo.skey,
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
	eventBus.emit('setPageLoading', false)
  },
  // 批量删除 按钮 点击显示弹窗
  handleDeleteAll() {
	this.$element('dialogDelete').show()
  },
  handleCancelDelete() {
	this.$element('dialogDelete').close()
  },
  handleConfirmDelete() {
	const {eventBus, loginInfo} = this.$app.$def;
	this.$element('dialogDelete').close()
	eventBus.emit('setPageLoading', true)

	const localIds = this.cartData.LocalList.SkuIds.split(',')
	const globalIds = this.cartData.OverseaList.SkuIds.split(',')

	agconnect.lowCode().callConnector({
	  connectorId, methodName: "deleteGoods", params: JSON.stringify({
		uid: loginInfo.uid,
		skey: loginInfo.skey,
		p: [...localIds, globalIds].join(',')
	  })
	}).then(res => {
	  this.commonSuccessFn(eventBus, res)
	  this.$emit('toggleEditing')
	}).catch(e => {
	  this.commonFailedFn(eventBus, e)
	});
  }
}
