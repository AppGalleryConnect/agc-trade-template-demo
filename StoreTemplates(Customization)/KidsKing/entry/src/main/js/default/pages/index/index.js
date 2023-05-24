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

import router from '@system.router';
import window from '@ohos.window';
import agconnect from "@hw-agconnect/core-harmony";
import "@hw-agconnect/lowcode-harmony";
import "@hw-agconnect/auth-harmony";
import "@hw-agconnect/core-harmony";
import storage from '@system.storage';
// import dataStorage from '@ohos.data.storage';
import { getFileUrls } from '../../utils/file-utils'
import { PregnantType, ArticleTitle, BabyStatus, BabyImgMap } from './config'
import { invokeWebView } from '../../common/invoke_webview';


export default {
  data: {
	babyInfoRes: {
	  data: {
		attentionBabyInfo: [{}],
		babyInfo: [{
		  babystate: "",
		  babytype: "",
		  bid: "",
		  birthday: "",
		  birthdiscribe: "",
		  day: "",
		  hasprefect: "",
		  height: "",
		  isDefault: "",
		  month: "",
		  nickname: "",
		  photo: "",
		  relationDesc: "",
		  relationId: "",
		  sex: "",
		  totalday: "",
		  truename: "",
		  week: "",
		  weight: "",
		  year: ""
		}], uid: ""
	  }, errmsg: "", errno: ""
	},
	userInfoRes: {
	  data: {
		activeflag: "",
		address: "",
		addtime: "",
		appactive: "",
		appactivetime: "",
		bgsubtype: "",
		birth: "",
		bornbabycount: "",
		city: "",
		cityShortName: "",
		cmemberlevel: "",
		community: "",
		department: "",
		district: "",
		districtShortName: "",
		identitycard: "",
		identityfrontpic: "",
		identityreversepic: "",
		invitecode: "",
		isattentofficialaccount: "",
		isauth3: "",
		isauthmember: "",
		isbindofficialaccount: "",
		ishonor: "",
		ismerchant: "",
		ispregnant: "",
		membercard: "",
		memberlevel: "",
		mobile: "",
		nickname: "",
		offlinenewguest: "",
		onlinenewguest: "",
		paidmemberlevel: "",
		paphoto: "",
		pauid: "",
		pgcHospName: "",
		pgcHospNo: "",
		photo: "",
		planpregnant: "",
		promoteactive: "",
		province: "",
		provinceShortName: "",
		rating: "",
		realname: "",
		regionid: "",
		registerbustype: "",
		sex: "",
		sharegain: "",
		signature: "",
		systime: "",
		truename: "",
		uid: "",
		userlevel: "",
		usertypedes: "",
		wechatavatar: "",
		wechatnickname: ""
	  }, errmsg: "", errno: ""
	},
	adTypeRes: [{
	  id: "",
	  createTime: "",
	  updateTime: "",
	  owner: "",
	  createBy: "",
	  updateBy: "",
	  type: 0
	}],
	title: '孩子王孕育',
	isShowDialog: false,
	pageLoading: false,
	windowClass: null,
	topBg: "/media/home/bg1.png",
	initStatusBarColor: '#ffd6e4', // 顶部状态栏的颜色，不同孕育状态颜色值需要变化
	parentConfig: {
	  today: {
		day_time: {}, content: {}
	  },
	  month: [{
		day_time: {}, content: {}
	  }]
	},
	pregnantConfig: {
	  today: {
		day_time: {}, content: {}
	  },
	  month: [{
		day_time: {}, content: {}
	  }]
	},
	// 从缓存中获取然后写入
	loginInfo: {
	  uid: '',
	  skey: ''
	},
	scene: '0',
	articleInfo: {
	  title: '',
	  list: []
	},
	headerMenuComputed: [],
	iconListAll: [],
	swiperType: 1, // 广告位显示样式
	swiperList: [],
	isShowAddBtn: true,
	loadingArticle: false,
	statusBarObserver: null,
	babyList: [],
	articleTagList: [],
	babyImgInPregnant: {},
	mainImg: '/media/home/noplan.png',
	mainTopInfo: {
	  img: "/media/home/noplan.png",
	  title: `开启孕育之旅吧`,
	  tips: '准备好进入下个人生阶段了吗？',
	  babyTips: [{
		img: '',
		text: "粑粑麻麻，我在未来等你们哟~"
	  }]
	},
	isLogin: false,
	currentUserType: 4,
  },
  onInit() {
	// this.pageLoading = true
	this.setInitDataFromStorage()
	this.getCookieInStorage()
	// this.actionsInLogin()
	// 页面初始化时设置顶部状态栏初始颜色，模拟沉浸式效果
	window.getTopWindow().then(data => {
	  this.windowClass = data;
	  this.setStatusBarColor(this.initStatusBarColor)
	})
  },
  async setInitDataFromStorage() {
	storage.get({
	  key: 'initHomeData',
	  success: (data) => {
		if (data && JSON.parse(data)) {
		  const valueObj = JSON.parse(data);
		  this.babyInfoRes = valueObj.babyInfoRes;
		  this.userInfoRes = valueObj.userInfoRes;
		  this.adTypeRes = valueObj.adTypeRes;
		  this.parentConfig = valueObj.parentConfig;
		  this.pregnantConfig = valueObj.pregnantConfig;
		  this.articleInfo = valueObj.articleInfo;
		  this.headerMenuComputed = valueObj.headerMenuComputed;
		  this.iconListAll = valueObj.iconListAll;
		  this.swiperType = valueObj.swiperType;
		  this.swiperList = valueObj.swiperList;
		  this.isShowAddBtn = valueObj.isShowAddBtn;
		  this.babyList = valueObj.babyList;
		  this.articleTagList = valueObj.articleTagList;
		  this.babyImgInPregnant = valueObj.babyImgInPregnant;
		  this.currentUserType = valueObj.currentUserType;
		  this.mainTopInfo = valueObj.mainTopInfo;
		  this.topBg = valueObj.topBg;
		  this.initStatusBarColor = valueObj.initStatusBarColor;
		}
	  },
	  fail: (data, code) => {
		console.error(`storage get initHomeData failed code：${code}`)
	  }
	})

  },
  setStorageDataByCurrentData() {
	const value = {
	  babyInfoRes: this.babyInfoRes,
	  userInfoRes: this.userInfoRes,
	  adTypeRes: this.adTypeRes,
	  parentConfig: this.parentConfig,
	  pregnantConfig: this.pregnantConfig,
	  articleInfo: this.articleInfo,
	  headerMenuComputed: this.headerMenuComputed,
	  iconListAll: this.iconListAll,
	  swiperType: this.swiperType,
	  swiperList: this.swiperList,
	  isShowAddBtn: this.isShowAddBtn,
	  babyList: this.babyList,
	  articleTagList: this.articleTagList,
	  babyImgInPregnant: this.babyImgInPregnant,
	  currentUserType: this.currentUserType,
	  mainTopInfo: this.mainTopInfo,
	  topBg: this.topBg,
	  initStatusBarColor: this.initStatusBarColor,
	}
	storage.set({
	  key: 'initHomeData',
	  value: JSON.stringify(value),
	  success: () => {},
	  fail: (data, code) => {
		console.error(`storage set initHomeData failed code：${code}`)
	  }
	})
  },
  // 从缓存获取uid和skey
  getCookieInStorage() {
	storage.get({
	  key: 'loginInfo',
	  success: loginInfoStr => {
		const res = JSON.parse(loginInfoStr)
		if (res && res.uid && res.skey) {
		  this.setLoginInfo(res.uid, res.skey)
		  this.isLogin = true;
		  this.actionsInLogin()
		} else {
		  this.actionsNotLogin()
		}
	  },
	  fail: (code, data) => {
		console.error('call storage.get fail, code: ' + code + ', data: ' + JSON.stringify(data));
		this.actionsNotLogin()
	  },
	})
  },
  actionsNotLogin() {
	this.getArticleTagDispatch(); // 文章标签
	this.getBabyPicDispatch(); // 孕期图片
	this.getAdListDispatch(); // 广告列表
	this.getAdTypeDispatch(); // 广告排版
	this.getHeadIconsListDispatch(); // 头部icon
	this.getQuickEntryListDispatch(); // 快捷入口

	this.getArticleList();
	this.isShowAddBtn = true;
  },
  actionsInLogin() {
	this.getUserInfoDispatch();
	this.getBabyInfoDispatch();
	this.getArticleTagDispatch(); // 文章标签
	this.getBabyPicDispatch(); // 孕期图片
	this.getAdListDispatch(); // 广告列表
	this.getAdTypeDispatch(); // 广告排版
	this.getHeadIconsListDispatch(); // 头部icon
	this.getQuickEntryListDispatch(); // 快捷入口

	// this.$watch('currentUserType', 'getArticleList');
  },
  computed: {
	// 主信息快中是否显示下拉箭头
	isShowDownBtn() {
	  return this.isLogin;
	},
	iconList() {
	  // 过滤出当前孕育状态 normal,pregnant,mother,plan
	  const list = this.iconListAll.filter(item => PregnantType[item.type] === this.currentUserType)
	  if (list.length > 10) {
		return list.slice(0, 10)
	  }
	  return list
	},
  },
  onShow() {
	this.observeStatusBarColor()
  },
  // onDestroy
  onHide() {
	// 移除监听
	this.statusBarObserver.unobserve();
	this.setStatusBarColor('#ffffff')

	this.setStorageDataByCurrentData()
  },
  setLoginInfo(uid, skey) {
	this.loginInfo.uid = uid
	this.loginInfo.skey = skey
  },
  // 当前孕育状态: 1-pregnant-怀孕中 2-mother-有小孩 3-plan-备孕中 4-normal-无计划
  computedCurrentUserType() {
	let userType = ''
	const babyList = this.babyInfoRes.data?.babyInfo;
	if (babyList instanceof Array && babyList.length > 0) {
	  // 取babyList中isDefault=1的那一条的babystate
	  const activeItem = babyList.filter(item => +item.isDefault === 1)[0]
	  userType = activeItem?.babystate
	} else {
	  userType = +this.userInfoRes.data?.planpregnant === 1 ? PregnantType.plan : PregnantType.normal
	}

	this.currentUserType = userType

	// 暂无计划显示添加孕育信息按钮
	this.isShowAddBtn = +userType === PregnantType.normal

	if (+userType === PregnantType.mother) {
	  this.topBg = "/media/home/bg2.png"
	  this.initStatusBarColor = '#ffe1dd'
	  this.setStatusBarColor('#ffe1dd')
	} else {
	  this.topBg = "/media/home/bg1.png"
	  this.initStatusBarColor = '#ffd6e4'
	  this.setStatusBarColor('#ffd6e4')
	}

	if (+userType === PregnantType.mother) {
	  this.getParentConfigDispatch()
	} else if (+userType === PregnantType.plan || +userType === PregnantType.normal) {
      // 备孕，无计划（默认情况：无计划，没有登录） 宝宝提示语取数据模型的数据
      this.getBabyTipDispatch() // 备孕中或无计划获取宝宝提示语
	} else if (+userType === PregnantType.pregnant) {
	  this.getPregnantConfigDispatch()
	} else {
	  this.getArticleList()
	}
  },
  getBabyInfoDispatch() {
	agconnect.lowCode().callConnector({
	  connectorId: "1151261566537100224", methodName: "getBabyInfo", params: JSON.stringify({
		uid: this.loginInfo.uid, skey: this.loginInfo.skey, scene: this.scene
	  })
	}).then(res => {
	  const ret = res.getValue().ret;
	  if (ret.code !== 0) {
		throw new Error(JSON.stringify(ret));
	  }
	  this.babyInfoRes = JSON.parse(res.getValue().response);

	  if (this.babyInfoRes.data?.babyInfo instanceof Array) {
		const defaultName = {
		  2: '小王子',
		  1: '小公主',
		}
		this.babyList = this.babyInfoRes?.data.babyInfo.map(item => {
		  const nickName = item.nickname || defaultName[item.sex]

		  return {
			statusText: nickName || BabyStatus[item.babystate],
			desc: item.birthdiscribe,
			img: item.photo || BabyImgMap[`${item.babystate}_${item.sex}`],
			isActive: +item.isDefault === 1,
			babyId: item.bid,
			nickName: nickName
		  }
		})
	  }

	  setTimeout(() => {
		this.computedCurrentUserType()
	  }, 30)
	}).catch(e => {
	  console.error(`getBabyInfoDispatch error, ${JSON.stringify(e)}`)
	});
  },
  getUserInfoDispatch() {
	agconnect.lowCode().callConnector({
	  connectorId: "1151261566537100224", methodName: "getUserInfo", params: JSON.stringify({
		uid: this.loginInfo.uid, skey: this.loginInfo.skey
	  })
	}).then(res => {
	  const ret = res.getValue().ret;
	  if (ret.code !== 0) {
		throw new Error(JSON.stringify(ret));
	  }
	  this.userInfoRes = JSON.parse(res.getValue().response);
	}).catch(e => {
	  console.error(`getUserInfoDispatch error, ${JSON.stringify(e)}`)
	});
  },

  // 修改宝宝信息
  handleChangeBabyInfo(event) {
	const {babyId, isActive} = event.target.attr.data;
	this.handleHideDialog()
	if (isActive) return;
	this.pageLoading = true;
	agconnect.lowCode().callConnector({
	  connectorId: "1151261566537100224", methodName: "setBabyInfo", params: JSON.stringify({
		uid: this.loginInfo.uid,
		skey: this.loginInfo.skey,
		b_id: babyId,
		b_default: '1'
	  })
	}).then(res => {
	  this.getBabyInfoDispatch()
	}).catch(e => {
	  console.error(`handleChangeBabyInfo error, ${JSON.stringify(e)}`)
	});
  },
  // 已有宝宝状态下获取配置信息
  getParentConfigDispatch() {
	agconnect.lowCode().callConnector({
	  connectorId: "1143545804447835456", methodName: "PregnantTipConfig", params: JSON.stringify({
		uid: this.loginInfo.uid, skey: this.loginInfo.skey, day_unix: new Date().valueOf().toString().slice(0, 10)
	  })
	}).then(res => {
	  const ret = res.getValue().ret;
	  if (ret.code !== 0) {
		throw new Error(JSON.stringify(ret));
	  }
	  this.parentConfig = JSON.parse(res.getValue().response).data;

	  const currentBaby = this.babyList?.filter(item => item.isActive)[0] || {}
	  // 设置主信息
	  this.mainTopInfo = {
		img: this.parentConfig.today.content.baby_image,
		title: currentBaby.nickName,
		tips: this.parentConfig.today.day_time?.age_desc,
		babyTips: this.parentConfig.today.content?.baby_speak?.map((item) => {
		  let img = ''
		  return {
			img, text: item
		  }
		}) || []
	  }
	  // 重新请求文章列表
	  this.getArticleList()
	}).catch(e => {
	  this.pageLoading = false;
	  console.error(`getParentConfigDispatch error, ${JSON.stringify(e)}`)
	});
  },

    // 获取宝宝提示语 plan/normal状态下会调用
    getBabyTipDispatch() {
        agconnect.lowCode().callDataModel({
            modelId: "1157216261164302017", methodName: "list", status: 0, params: {}
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            const list = res.getValue().data.records;
            console.info(`getBabyTipDispatch list, ${JSON.stringify(list)}`)
            const currentTips = list.filter(item => +item?.type === this.currentUserType).map((item) => {
                let img = ''
                return {
                    img, text: item?.msg
                }
            }) || []
            // 设置主信息
            this.mainTopInfo = {
                ...this.mainTopInfo,
                babyTips: currentTips
            }
        }).catch(e => {
            console.error(`getBabyTipDispatch error, ${JSON.stringify(e)}`)
        });
    },
  
  // 孕期状态下获取配置信息
  getPregnantConfigDispatch() {
	const params = {
	  uid: this.loginInfo.uid, skey: this.loginInfo.skey, day_unix: new Date().valueOf().toString().slice(0, 10)
	}
	agconnect.lowCode().callConnector({
	  connectorId: "1143545804447835456", methodName: "pregnentConfig", params: JSON.stringify(params)
	}).then(res => {
	  const ret = res.getValue().ret;
	  if (ret.code !== 0) {
		throw new Error(JSON.stringify(ret));
	  }
	  this.pregnantConfig = JSON.parse(res.getValue().response).data;
	  const week = this.pregnantConfig.today.day_time?.week_num;
	  // 设置主信息
	  this.mainTopInfo = {
		img: this.babyImgInPregnant[week] || this.mainImg,
		title: this.pregnantConfig.today.day_time?.age_desc,
		tips: `还有${this.pregnantConfig.today.day_time?.expire_day_num}天出生`,
		babyTips: this.pregnantConfig.today.content?.baby_notice?.map((item, index) => {
		  let img = ''
		  if (index === 0) {
			img = this.pregnantConfig.today.content?.size_photo;
		  }
		  return {
			img, text: item
		  }
		}) || []
	  }
	  // 重新请求文章列表
	  this.getArticleList()
	}).catch(e => {
	  this.pageLoading = false;
	  console.error(`getPregnantConfigDispatch error, ${JSON.stringify(e)}`)
	});
  },
  // 获取文章列表
  getArticleList() {
	if (this.loadingArticle === true) return;
	this.loadingArticle = true;
	const articlePregnantType = {
	  [PregnantType.pregnant]: 1,
	  [PregnantType.plan]: 2,
	  [PregnantType.mother]: 3,
	}
	const params = {
	  time_type: articlePregnantType[this.currentUserType],
	}
	// 育儿期必传
	if (+this.currentUserType === PregnantType.mother) {
	  params.age = this.parentConfig.today.day_time?.age;
	  params.month = this.parentConfig.today.day_time?.month;
	}
	// 怀孕期必传
	if (+this.currentUserType === PregnantType.pregnant) {
	  params.week = this.pregnantConfig.today.day_time?.week_num
	}
	agconnect.lowCode().callConnector({
	  connectorId: "1143545804447835456", methodName: "getArticleList", params: JSON.stringify(params)
	}).then(res => {
	  const ret = res.getValue().ret;
	  if (ret.code !== 0) {
		throw new Error(JSON.stringify(ret));
	  }
	  const list = JSON.parse(res.getValue().response).data;
	  const showNumFn = (readNum, initReadNum) => {
		const total = Number(readNum) + Number(initReadNum);
		if (total >= 10000) {
		  return `${(total / 10000).toFixed(2)}w人读过`
		}
		return `${total}人读过`
	  }
	  const selectedArr = this.articleTagList.filter(item => +item.type === +this.currentUserType)
	  const selectObj = {}
	  selectedArr.forEach(item => {
		selectObj[item.columnID] = item.img
	  })
	  const arr = list.map(item => {
		return {
		  title: item.title,
		  img: item.cover_path.startsWith('http://') ? item.cover_path.replace('http://', 'https://') : item.cover_path,
		  tagImg: selectObj[item.columnID],
		  readCount: showNumFn(item.read_num, item.init_read_num),
		  articleId: item.id
		}
	  })

	  this.articleInfo = {
		title: ArticleTitle[this.currentUserType || PregnantType.normal],
		list: arr
	  }
	  this.loadingArticle = false;
	  this.pageLoading = false;
	}).catch(e => {
	  this.loadingArticle = false;
	  this.pageLoading = false;
	  console.error(`getArticleList error, ${JSON.stringify(e)}`)
	})
  },
  // 请求快捷入口列表
  getQuickEntryListDispatch() {
	agconnect.lowCode().callDataModel({
	  modelId: "1151565431287368129", methodName: "list", status: 0, params: {}
	}).then(res => {
	  const ret = res.getValue().ret;
	  if (ret.code !== 0) {
		throw new Error(JSON.stringify(ret));
	  }
	  this.iconListFetchSuccess(res);
	}).catch(e => {
	  console.error(`getQuickEntryListDispatch error, ${JSON.stringify(e)}`)
	});
  },
  getArticleTagDispatch() {
	agconnect.lowCode().callDataModel({
	  modelId: "1157213563245362881", methodName: "list", status: 0, params: {}
	}).then(res => {
	  const ret = res.getValue().ret;
	  if (ret.code !== 0) {
		throw new Error(JSON.stringify(ret));
	  }
	  this.articleTagFetchSuccess(res);
	}).catch(e => {
	  console.error(`getArticleTagDispatch error, ${JSON.stringify(e)}`)
	});
  },
  getAdListDispatch() {
	agconnect.lowCode().callDataModel({
	  modelId: "1151571945830019329", methodName: "list", status: 0, params: {}
	}).then(res => {
	  const ret = res.getValue().ret;
	  if (ret.code !== 0) {
		throw new Error(JSON.stringify(ret));
	  }
	  this.adListFetchSuccess(res);
	}).catch(e => {
	  console.error(`getAdListDispatch error, ${JSON.stringify(e)}`)
	});
  },
  getBabyPicDispatch() {
	agconnect.lowCode().callDataModel({
	  modelId: "1157218589590224577", methodName: "list", status: 0, params: {}
	}).then(res => {
	  const ret = res.getValue().ret;
	  if (ret.code !== 0) {
		throw new Error(JSON.stringify(ret));
	  }
	  this.getBabyPicFetchSuccess(res);
	}).catch(e => {
	  console.error(`getBabyPicDispatch error, ${JSON.stringify(e)}`)
	});
  },
  getAdTypeDispatch() {
	agconnect.lowCode().callDataModel({
	  modelId: "1151570762071591361", methodName: "list", status: 0, params: {}
	}).then(res => {
	  const ret = res.getValue().ret;
	  if (ret.code !== 0) {
		throw new Error(JSON.stringify(ret));
	  }
	  this.adTypeRes = res.getValue().data.records;
	  this.swiperType = this.adTypeRes[0].type;
	}).catch(e => {
	  console.error(`getAdTypeDispatch error, ${JSON.stringify(e)}`)
	});
  },
  getHeadIconsListDispatch() {
	agconnect.lowCode().callDataModel({
	  modelId: "1151568262853619969", methodName: "list", status: 0, params: {}
	}).then(res => {
	  const ret = res.getValue().ret;
	  if (ret.code !== 0) {
		throw new Error(JSON.stringify(ret));
	  }
	  this.menuFetchSuccess(res);
	}).catch(e => {
	  console.error(`getHeadIconsListDispatch error, ${JSON.stringify(e)}`)
	});
  },
  // 点击快捷入口
  handleClickQuickIcon(event) {
	const {href = ''} = event.target.attr.data
	invokeWebView({
	  url: href
	});
  },
  // 打开宝宝列表弹窗
  handleShowDialog() {
	if (!this.isLogin) return;
	this.isShowDialog = true;
  },
  // 关闭宝宝列表弹窗
  handleHideDialog() {
	this.isShowDialog = false;
  },
  //  监听元素是否可见，动态改变statusBar的颜色
  observeStatusBarColor() {
	this.statusBarObserver = this.$element("topMain").createIntersectionObserver({
	  ratios: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8], // number
	})
	this.statusBarObserver.observe((isVisible, ratio) => {
	  if (ratio < 0.1) {
		// 颜色值只能是6位或者8位，不能简写3位
		this.setStatusBarColor('#ffffff')
	  } else if (ratio > 0.8) {
		this.setStatusBarColor(this.initStatusBarColor)
	  } else {
		// 透明度的值 转成16进制 statusBar的颜色值透明度只能放在前面
		const prefix = Math.floor(ratio * 255).toString(16)
		this.setStatusBarColor(`#${prefix}${this.initStatusBarColor.slice(1)}`)
	  }
	})
  },
  // 设置系统状态栏背景色
  setStatusBarColor(statusBarColor) {
	this.windowClass.setSystemBarProperties({
	  statusBarColor
	});
  },
  // 顶部右侧菜单成功回调
  async menuFetchSuccess(res) {
	const list = res.getValue().data.records;
	const newList = await getFileUrls(list)
	const arr = newList.map(item => {
	  return {
		id: item.id,
		href: item.href,
		img: item.pic,
	  }
	}) || []

	this.headerMenuComputed = arr;
  },
  // 快捷入口成功回调
  async iconListFetchSuccess(res) {
	const list = res.getValue().data.records;
	const newList = await getFileUrls(list)
	const arr = newList.map(item => {
	  return {
		text: item.name,
		img: item.pic,
		href: item.href,
		type: item.type,
		id: item.id
	  }
	}) || []

	this.iconListAll = arr;
  },
  // 广告列表成功回调
  async adListFetchSuccess(res) {
	const list = res.getValue().data.records;
	const newList = await getFileUrls(list)
	const arr = newList.map(item => {
	  return {
		href: item.href,
		img: item.pic,
		id: item.id
	  }
	}) || []
	this.swiperList = arr;
  },
  // 孕期图片成功回调
  async getBabyPicFetchSuccess(res) {
	const list = res.getValue().data.records;
	const newList = await getFileUrls(list)
	const obj = {}
	newList.forEach(item => {
	  obj[item.week] = item.pic
	})
	this.babyImgInPregnant = obj;
  },
  // 文章标签成功回调
  async articleTagFetchSuccess(res) {
	const list = res.getValue().data.records;
	const newList = await getFileUrls(list, 'icon')
	const arr = newList.map(item => {
	  return {
		type: item.type,
		img: item.icon,
		columnID: item.columnID
	  }
	}) || []
	this.articleTagList = arr;
  },
  // 跳转至购物车页面
  handleJumpToCart() {
	router.replace({
	  uri: 'pages/cart/cart',
	});
  },
  // 跳转至我的页面
  handleJumpToMine() {
	router.replace({
	  uri: 'pages/personalCenter/personalCenter',
	});
  },
  // 跳转到宝宝信息维护页
  handleJumpToBabyInfoConfig() {
	invokeWebView({
	  url: `https://w.cekid.com/user/baby-info.html?isBabyInfo=1`
	});
  },
  // 跳转至文章详情页
  handleJumpToArticleDetail(event) {
	const {articleId} = event.target.attr.data;
	invokeWebView({
	  url: `https://w.cekid.com/kidscome/knowledge/detail?share=0&businesstag=yunyupingtai&naviType=4&artid=${articleId}`
	});
  },
  // 跳转至文章列表页
  handleJumpToArticleList() {
	invokeWebView({
	  url: 'https://w.cekid.com/kidscome/knowledge/index?naviType=4'
	});
  },
  handleClickAddBtn() {
	// 未登录跳到登录页
	if (!this.isLogin) {
	  return router.push({
		uri: 'pages/login/login',
	  });
	}
	// 已登录跳到宝宝信息维护页
	this.handleJumpToBabyInfoConfig()
  },
  handleClickAd(event) {
	const {href} = event.target.attr.data;
	invokeWebView({
	  url: href
	});
  },
  handleClickHeaderIcon(event) {
	const {href} = event.target.attr.data;
	invokeWebView({
	  url: href
	});
  },
}