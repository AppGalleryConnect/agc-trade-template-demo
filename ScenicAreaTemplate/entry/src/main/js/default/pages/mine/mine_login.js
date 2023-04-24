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
import { PhoneAuthProvider, VerifyCodeAction } from '@hw-agconnect/auth-harmony';

export default {
    data: {
        phoneNumber: '',
        verifyCode: '',
        routerUri:'',
        tableIndex:0,
        notice:'',
    },

    onInit() {

    },

    requestVerifyCode() {
        if (this.getPhoneNumber() === false) {
            return;
        }
        agconnect.auth().requestPhoneVerifyCode("86", this.phoneNumber, {
            action: VerifyCodeAction.REGISTER_LOGIN,
            lang: 'zh_CN',
            sendInterval: 60
        }).then(verifyCodeResult => {
            //验证码申请成功

        }).catch(error => {
            //验证码申请失败
        });
    },

    loginByPhone() {
        if (this.getPhoneNumber() === false) {
            return;
        }
        if (this.getVerifyCode() === false) {
            return;
        }
        let credential = PhoneAuthProvider.credentialWithVerifyCode("86", this.phoneNumber, this.verifyCode);
        agconnect.auth().signIn(credential)
            .then(user => {
                //登录成功
                console.log("loginByPhone success.");

                this.routerToBack();
            }).catch(e => {
                //登录失败
                console.log("loginByPhone failed : " + e);
            });
    },

    loginByHuaweiId() {
        console.log("loginByHuaweiId.");
        agconnect.auth().signIn(1).then(user => {
            console.log("loginByHuaweiId success.");

            this.routerToBack();
        }).catch(e => {
            console.log("loginByHuaweiId failed : " + e);
        })
    },

    onChangePhoneNumber(e) {
        console.log("onChangePhoneNumber, value : " + e.value);
        this.phoneNumber = e.value;
    },

    onChangeVerifyCode(e) {
        console.log("onChangeVerifyCode, value : " + e.value);
        this.verifyCode = e.value;
    },

    getPhoneNumber() {
        console.log("getPhoneNumber");
        if (this.phoneNumber && this.phoneNumber.length == 11) {
            return true;
        } else {
            this.notice = '请输入正确的手机号码';
            this.$element('mine_login_dialog1').show();
            return false;
        }
    },

    getVerifyCode() {
        console.log("getVerifyCode");
        if (this.verifyCode && this.verifyCode.length > 0) {
            return true;
        } else {
            this.notice = '请输入正确的验证码';
            this.$element('mine_login_dialog1').show();
            return false;
        }
    },

    routerToBack() {
        let localUri = this.routerUri;

        // 如果拉起登录界面的界面指定了登录成功后需要跳转的页面，则跳转到指定页面，否则默认返回原页面
        if (localUri) {
            this.routerUri = '';

            router.replace({
                uri: localUri,
                params: {
                    tableIndex: this.tableIndex,
                }
            }
            );
        } else {
            router.back();
        }
    },
}