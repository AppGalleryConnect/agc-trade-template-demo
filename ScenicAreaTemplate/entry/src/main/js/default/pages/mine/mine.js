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
import "@hw-agconnect/auth-harmony";
import agconnect from "@hw-agconnect/core-harmony";
import { checkUserLoginStatus } from "../utils/auth_util"
export default {
    data: {
        userInfo: {
            url:"",
            userName:"",
            showUnLogin:true,
            showLogined:false,
        },
        tableIndex:0,
    },
    onInit() {
        agconnect.auth().getCurrentUser().then(user=>{
            if (user) {
                this.showLogined(user);
            } else {
                this.showUnLogin();
            }
        }).catch(error => {
            this.showUnLogin();
        })
    },

    showLogined(user) {
        console.log("showLogined");

        // 用户没有头像的话，给个默认的头像
        this.userInfo.url = user.getPhotoUrl() ?  user.getPhotoUrl() : "/media/mine/mine_active.png";
        this.userInfo.userName = user.getDisplayName();
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

    routerToLogin() {
        router.push({
            uri: 'pages/mine/mine_login',
            params: {
                routerUri:'pages/index/index',
                tableIndex:this.tableIndex,
            }
        })
    },

    loginOut() {
        console.log("loginOut");
        agconnect.auth().signOut();
        this.showUnLogin();
    }
}