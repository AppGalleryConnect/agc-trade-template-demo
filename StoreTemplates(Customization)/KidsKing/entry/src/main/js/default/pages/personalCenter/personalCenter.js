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
import "@hw-agconnect/lowcode-harmony";
import "@hw-agconnect/auth-harmony";
import "@hw-agconnect/core-harmony";
import router from '@system.router';
import { invokeWebView } from '../../common/invoke_webview';
import storage from '@system.storage';
import { LEVEL_BLACKGOLD } from '../../common/constants';

export default {
    // Start of auto-generated Super Visual code. DO NOT MODIFY
    refreshlistt_my_order_l6rfj() {
        agconnect.lowCode().callDataModel({
            modelId: "1150016801422242049", methodName: "list", status: 0, params: {
                orderBy: "createTime", orderType: "asc"
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listt_my_order_l6rfj = res.getValue().data.records;
            this.handleMyOrderData(res);
        }).catch(e => {
            ;
        });
    },
    refreshlistt_my_assets_wsgm7() {
        agconnect.lowCode().callDataModel({
            modelId: "1150017286065680641", methodName: "list", status: 0, params: {
                orderBy: "createTime", orderType: "asc"
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listt_my_assets_wsgm7 = res.getValue().data.records;
            this.handleMyAssetData(res);
        }).catch(e => {
            ;
        });
    },
    refreshlistt_my_common_use_r6rb8() {
        agconnect.lowCode().callDataModel({
            modelId: "1150017472418607361", methodName: "list", status: 0, params: {
                orderBy: "createTime", orderType: "asc"
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listt_my_common_use_r6rb8 = res.getValue().data.records;
            this.handleMyRecentlyData(res);
        }).catch(e => {
            ;
        });
    },
    refreshlistt_broadcast_0do9e() {
        agconnect.lowCode().callDataModel({
            modelId: "1151283015352109505", methodName: "list", status: 0, params: {
                orderBy: "createTime", orderType: "desc"
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listt_broadcast_0do9e = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    // End of auto-generated Super Visual code. DO NOT MODIFY
    queryUserConsumptionScore() {
        return agconnect.lowCode().callConnector({
            connectorId: "1151261566537100224", methodName: "getConsumptionScore", params: JSON.stringify({
                uid: this.uid, skey: this.skey
            }),
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code === 0) {
                const body = JSON.parse(res.getValue().response);
                if (body.errno === 0) {
                    this.points = body.data.accountpoints;
                }
            }
        });
    },
    data: {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        listt_my_order_l6rfj: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            img: "",
            text: "",
            link: ""
        }],
        listt_my_assets_wsgm7: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            img: "",
            text: "",
            link: ""
        }],
        listt_my_common_use_r6rb8: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            img: "",
            text: "",
            link: ""
        }],
        listt_broadcast_0do9e: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            text: "",
            link: ""
        }],
        // End of auto-generated Super Visual code. DO NOT MODIFY
        isVip: false,
        isCommon: true,
        username: '请登录',
        avatar: '',
        level: 1,
        points: 0,
        userInfo: null,
        uid: '',
        skey: '',
        myOrderList: [{
            id: '', img: '', text: '', link: ''
        }, {
            id: '', img: '', text: '', link: ''
        }, {
            id: '', img: '', text: '', link: ''
        }, {
            id: '', img: '', text: '', link: ''
        }],
        myAssetList: [{
            id: '', img: '', text: '', link: ''
        }, {
            id: '', img: '', text: '', link: ''
        }, {
            id: '', img: '', text: '', link: ''
        }, {
            id: '', img: '', text: '', link: ''
        }],
        myRecentlyList: [{
            id: '', img: '', text: '', link: ''
        }, {
            id: '', img: '', text: '', link: ''
        }, {
            id: '', img: '', text: '', link: ''
        }, {
            id: '', img: '', text: '', link: ''
        }, {
            id: '', img: '', text: '', link: ''
        }, {
            id: '', img: '', text: '', link: ''
        }, {
            id: '', img: '', text: '', link: ''
        }, {
            id: '', img: '', text: '', link: ''
        }],
    },
    async onInit() {
        const currentUser = await agconnect.auth().getCurrentUser();
        if (!currentUser) {
            return router.replace({
                uri: 'pages/login/login'
            });
        } else {
            router.clear();
            storage.get({
                key: 'userInfo',
                success: (userInfo) => {
                    this.userInfo = JSON.parse(userInfo);
                    this.avatar = this.userInfo.photo;
                    this.level = this.userInfo.userlevel;
                    this.username = this.userInfo.nickname;
                    this.isVip = this.userInfo.memberlevel === LEVEL_BLACKGOLD;
                    this.isCommon = !this.isVip;
                }
            });
            storage.get({
                key: 'loginInfo',
                success: (loginInfo) => {
                    const obj = JSON.parse(loginInfo);
                    this.uid = obj.uid;
                    this.skey = obj.skey;
                    this.queryUserConsumptionScore();
                }
            })
        }
        this.preloadFromStorage();
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshlistt_my_order_l6rfj();
        this.refreshlistt_my_assets_wsgm7();
        this.refreshlistt_my_common_use_r6rb8();
        this.refreshlistt_broadcast_0do9e();
        // End of auto-generated Super Visual code. DO NOT MODIFY

    },
    handleMyOrderData(res) {
        this.listt_my_order_l6rfj.forEach((item, index) => {
            this.myOrderList[index] = item;
        });
        this.myOrderList = [...this.myOrderList];
        storage.set({
            key: 'personalCenter_myOrders',
            value: JSON.stringify(this.myOrderList)
        });
    },
    handleMyAssetData(res) {
        this.listt_my_assets_wsgm7.forEach((item, index) => {
            this.myAssetList[index] = item;
        });
        this.myAssetList = [...this.myAssetList];
        storage.set({
            key: 'personalCenter_myAssets',
            value: JSON.stringify(this.myAssetList)
        });
    },
    handleMyRecentlyData(res) {
        this.listt_my_common_use_r6rb8.forEach((item, index) => {
            this.myRecentlyList[index] = item;
        });
        this.myRecentlyList = [...this.myRecentlyList];
        storage.set({
            key: 'personalCenter_myRecent',
            value: JSON.stringify(this.myRecentlyList)
        });
    },
    preloadFromStorage() {
        storage.get({
            key: 'personalCenter_myOrders',
            success: (data) => {
                if (data) {
                    this.myOrderList = JSON.parse(data);
                }
            }
        });
        storage.get({
            key: 'personalCenter_myAssets',
            success: (data) => {
                if (data) {
                    this.myAssetList = JSON.parse(data);
                }
            }
        });
        storage.get({
            key: 'personalCenter_myRecent',
            success: (data) => {
                if (data) {
                    this.myRecentlyList = JSON.parse(data);
                }
            }
        })
    },
    handleClick(event) {
        const elementId = event?.currentTarget?._id ?? '';
        if (!elementId) {
            return;
        }
        const splits = elementId.split('_');
        let url = '';
        if (splits[0] === 'myorder') {
            url = this.myOrderList[splits[1]].link;
        } else if (splits[0] === 'myasset') {
            url = this.myAssetList[splits[1]].link;
        } else if (splits[0] === 'mycommon') {
            url = this.myRecentlyList[splits[1]].link;
        }
        invokeWebView({
            url
        });
    },
    // 跳转至购物车页面
    handleJumpToCart() {
        router.replace({
            uri: 'pages/cart/cart',
        });
    },
    // 跳转至主页
    handleJumpToHome() {
        router.replace({
            uri: 'pages/index/index',
        });
    },
}