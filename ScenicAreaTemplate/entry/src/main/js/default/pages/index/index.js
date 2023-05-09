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
import featureAbility from '@ohos.ability.featureAbility'
import router from '@system.router';
import "@hw-agconnect/auth-harmony";
import { checkUserLoginStatus } from '../utils/auth_util';
import { getFileUrls } from '../utils/file_util';
import { phoneAnonymous } from "../utils/anonymous_util"

const tabs_info_map = [{
    "active": {
        "icon": "/media/index/home_active.png",
        "name": "首页",
        "visibility": true
    },
    "deactivate": {
        "icon": "/media/index/home_deactivate.png",
        "name": "首页",
        "visibility": false
    }
}, {
    "active": {
        "icon": "/media/index/book_active.png",
        "name": "预约",
        "visibility": true
    },
    "deactivate": {
        "icon": "/media/index/book_deactivate.png",
        "name": "预约",
        "visibility": false
    },
}, {
    "active": {
        "icon": "/media/index/mine_active.png",
        "name": "我的",
        "visibility": true
    },
    "deactivate": {
        "icon": "/media/index/mine_deactivate.png",
        "name": "我的",
        "visibility": false
    }
}];

export default {

    // Start of auto-generated Super Visual code. DO NOT MODIFY
    refreshlistappoint_list_7x0vv() {
        agconnect.lowCode().callDataModel({
            modelId: "1138428012828608641", methodName: "list", status: 0, params: {
                orderBy: "no", orderType: "asc"
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listappoint_list_7x0vv = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    refreshlistbanner_2o34f() {
        agconnect.lowCode().callDataModel({
            modelId: "1138484559948597377", methodName: "list", status: 0, params: {
                orderBy: "no", orderType: "asc"
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listbanner_2o34f = res.getValue().data.records;
            this.getPictureUrls(res);
        }).catch(e => {
            ;
        });
    },
    refreshlistnotice_v9w2j() {
        agconnect.lowCode().callDataModel({
            modelId: "1138483804319565953", methodName: "list", status: 0, params: {
                orderBy: "no", orderType: "desc"
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listnotice_v9w2j = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    refreshlistintroduce_s6s17() {
        agconnect.lowCode().callDataModel({
            modelId: "1138482862236944513", methodName: "list", status: 0, params: {}
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listintroduce_s6s17 = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    refreshlistconsolt_dxc9z() {
        agconnect.lowCode().callDataModel({
            modelId: "1138481656676534401", methodName: "list", status: 0, params: {
                orderBy: "no", orderType: "asc"
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listconsolt_dxc9z = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    // End of auto-generated Super Visual code. DO NOT MODIFY

    // Home logic
    data: {

        // Start of auto-generated Super Visual code. DO NOT MODIFY
        listappoint_list_7x0vv: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            no: 0,
            name: "",
            price: "",
            introduction: "",
            instruction: "",
            explanation: "",
            pic: "",
            picture: ""
        }],
        listbanner_2o34f: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            no: 0,
            picturePath: ""
        }],
        listnotice_v9w2j: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            no: 0,
            msg: ""
        }],
        listintroduce_s6s17: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            pictureUrl: "",
            title: ""
        }],
        listconsolt_dxc9z: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            no: 0,
            pictureUrl: ""
        }],
        // End of auto-generated Super Visual code. DO NOT MODIFY
        tabs_info: [
            {
                "icon": "/media/index/home_active.png",
                "name": "首页",
                "visibility": true
            },
            {
                "icon": "/media/index/book_deactivate.png",
                "name": "预约",
                "visibility": false
            },
            {
                "icon": "/media/index/mine_deactivate.png",
                "name": "我的",
                "visibility": false
            },
        ],
        userInfo: {
            url: "",
            userName: "",
            showUnLogin: true,
            showLogined: false,
        },
        tableIndex: 0,
    },


    gotoMapAbility() {
        featureAbility.startAbility({
            want:
            {
                bundleName: "com.huawei.scenicarea",
                abilityName: "com.huawei.scenicarea.map.MapAbility"
            },
        });
    },

    // appoint list logic

    // login logic
    showLogined(user) {
        console.log("showLogined");

        // 用户没有头像的话，给个默认的头像
        this.userInfo.url = user.getPhotoUrl() ? user.getPhotoUrl() : "/media/mine/mine_active.png";
        this.userInfo.userName = user.getDisplayName() ? user.getDisplayName() : phoneAnonymous(user.getPhone());
        this.userInfo.showUnLogin = false;
        this.userInfo.showLogined = true;
    },

    showUnLogin() {
        console.log("showUnLogin");

        this.userInfo.showUnLogin = true;
        this.userInfo.showLogined = false;
    },

    routerToSuggestion() {
        console.log("routerToSuggestion");

        checkUserLoginStatus(() => {
            router.push({
                uri: 'pages/mine/mine_suggestion',
            })
        }, () => {
            this.routerToLogin();
        });
    },

    routerToMineAppointment() {
        console.log("routerToMineAppointment");

        checkUserLoginStatus(() => {
            router.push({
                uri: 'pages/mine/mine_appointment',
            })
        }, () => {
            this.routerToLogin();
        });
    },

    routerToMineOrders() {
        console.log("routerToMineOrders");

        checkUserLoginStatus(() => {
            router.push({
                uri: 'pages/mine/mine_orders',
            })
        }, () => {
            this.routerToLogin();
        });
    },

    routerToAppointment() {
        console.log("routerToAppointment");
        router.push({
            uri: 'pages/appointment/appointment_list',
        })
    },

    routerToTicketList() {
        console.log("routerToTicketList");
        router.push({
            uri: 'pages/ticket/ticket_list',
        })
    },

    routerToLogin() {
        router.push({
            uri: 'pages/mine/mine_login',
            params: {
                routerUri: 'pages/index/index',
                tableIndex: this.tableIndex,
            }
        })
    },

    loginOut() {
        console.log("loginOut");
        agconnect.auth().signOut();
        this.showUnLogin();
    },

    // index logic
    updateByIndex(index) {
        let temp_tabs_info = [tabs_info_map[0]["deactivate"], tabs_info_map[1]["deactivate"], tabs_info_map[2]["deactivate"]];
        temp_tabs_info[index] = tabs_info_map[index]["active"]
        this.tabs_info = temp_tabs_info;
    },

    onHomeClick() {
        this.updateByIndex(0);
        this.tableIndex = 0;
    },
    onBookClick() {
        this.updateByIndex(1);
        this.tableIndex = 1;
    },
    onMineClick() {
        this.checkUserLogin();
        this.updateByIndex(2);
        this.tableIndex = 2;
    },

    startAppointmentList() {
        router.push({
            uri: 'pages/appointment/appointment_list'
        })
    },

    getPictureUrls(res) {
        getFileUrls(res).then(res => {
            this.listbanner_2o34f = res;
        });
    },

    onInit() {

        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshlistappoint_list_7x0vv();
        this.refreshlistbanner_2o34f();
        this.refreshlistnotice_v9w2j();
        this.refreshlistintroduce_s6s17();
        this.refreshlistconsolt_dxc9z();
        // End of auto-generated Super Visual code. DO NOT MODIFY
        this.updateByIndex(this.tableIndex);
        if (this.tableIndex === 2) {
            this.checkUserLogin();
        }
    },
    checkUserLogin() {
        agconnect.auth().getCurrentUser().then(user => {
            if (user) {
                this.showLogined(user);
            } else {
                this.showUnLogin();
            }
        }).catch(error => {
            this.showUnLogin();
        })
    },
    startAppointment(e) {
        checkUserLoginStatus((user) => {
            router.push({
                uri: 'pages/appointment/appointment_confirm',
                params: {
                    uid: user.getUid(),
                    appointmentInfo: {
                        name: e.target.attr.data.name,
                        pic: e.target.attr.data.pic,
                        scenicAreaId: e.target.attr.data.id
                    }
                }
            });
        }, () => {
            router.push({
                uri: 'pages/mine/mine_login',
            });
        });
    },
    gotoPrivacyStatementDetail() {
        console.log("gotoPrivacyStatementDetail");
    }
}