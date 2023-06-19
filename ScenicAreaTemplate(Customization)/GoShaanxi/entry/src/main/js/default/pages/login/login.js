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
import agcLogin from "@hw-agconnect/agc-login-jssdk";
import prompt from '@system.prompt';

export default {
    // Start of auto-generated Super Visual code. DO NOT MODIFY
    refreshhuaweiLogincsljq_g0nqo() {
        agconnect.lowCode().callConnector({
            connectorId: "1179736861313114560", methodName: "huaweiLogin", params: JSON.stringify({
                huaweitoken: this.huaweiToken
            })
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.huaweiLogincsljq_g0nqo = JSON.parse(res.getValue().response);
            this.goShaanxiLoginSuccess(res);
        }).catch(e => {
            this.failCallback(e);
        });
    },
    // End of auto-generated Super Visual code. DO NOT MODIFY
    data: {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        huaweiLogincsljq_g0nqo: {
            code: "", data: {
                token: "", refresh: ""
            }, msg: "", success: ""
        },
        // End of auto-generated Super Visual code. DO NOT MODIFY
        huaweiToken: ""
    },
    onInit() {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshhuaweiLogincsljq_g0nqo();
        // End of auto-generated Super Visual code. DO NOT MODIFY
    },
    login() {
        var signValue = {
            type: [
                "HWID_VERIFY_CODE",
                "PHONE"
            ],
            isAgreement: true, // 是否设置隐私申明
            agreementContent: "https://developer.huawei.com/consumer/cn/", // 设置隐私申明地址
            logo: "/media/logo.png"
        };
        agcLogin.signIn(signValue).then(data => {
            this.huaweiToken = JSON.parse(data.result).accessToken;
            this.refreshhuaweiLogincsljq_g0nqo();
            this.successCallback(data.result);
        }, err => {
            this.failCallback(err);
        });
    },
    signOut() {
        agcLogin.signOut();
        prompt.showToast({
            message: "signOut",
            duration: 30000,
        })
    },
    getCurrentUser() {
        agcLogin.getCurrentUser().then(data => {
            this.successCallback(data);
        }, err => {
            this.failCallback(err);
        });
    },
    goShaanxiLoginSuccess(res) {
    },
    successCallback(data) {
        prompt.showToast({
            message: "successCallback: " + JSON.stringify(data) + "  goShaanxiLoginStatus: " + JSON.stringify(this.huaweiLogincsljq_g0nqo),
            duration: 30000,
        })
    },
    failCallback(err) {
        prompt.showToast({
            message: "failCallback: " + JSON.stringify(err),
            duration: 30000,
        })
    }
}