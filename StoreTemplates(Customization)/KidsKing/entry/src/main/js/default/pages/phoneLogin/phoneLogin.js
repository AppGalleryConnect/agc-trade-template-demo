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
import "@hw-agconnect/auth-harmony";
import agconnect from "@hw-agconnect/core-harmony";
import { PhoneAuthProvider, VerifyCodeAction } from '@hw-agconnect/auth-harmony';
import router from '@system.router';
import prompt from '@system.prompt';
import { uid, skey } from '../../common/mock_data';
import { getKidsWantUserInfo, handleLoginFail, goToPersonalCenter } from '../../utils/login';
import { invokeWebView } from '../../common/invoke_webview';
import { AGREEMENT_URLS } from '../../common/constants';

export default {
    getUserInfo() {
        return agconnect.lowCode().callConnector({
            connectorId: "1151261566537100224", methodName: "getUserInfo", params: JSON.stringify({
                uid: this.uid, skey: this.skey
            })
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code === 0) {
                this.userInfo = JSON.parse(res.getValue().response).data;
            }
        });
    },
    data: {
        type: 'login',
        title: '',
        btnText: '',
        phoneNumber: '',
        verifyCode: '',
        termsChecked: true,
        disableRequestVerifyCode: true,
        requestVerifyCodeText: '获取验证码',
        disableVerifyCodeLogin: true,
        loginBtnLoading: false,
        uid: '',
        skey: '',
        userInfo: null,
    },
    onInit() {
        if (this.type === 'login') {
            this.title = '手机号登录';
            this.btnText = '登录';
        } else if (this.type === 'bind') {
            this.title = '绑定手机';
            this.btnText = '绑定';
        }
    },
    onPhoneNumberChange(event) {
        this.phoneNumber = event.value;
        this.disableVerifyCodeLogin = !(this.verifyCode && this.verifyCode.length > 0 && this.phoneNumber && this.phoneNumber.length == 11);
        this.disableRequestVerifyCode = !(this.phoneNumber && this.phoneNumber.length == 11);
    },
    onVerifyCodeChange(event) {
        this.verifyCode = event.value;
        this.disableVerifyCodeLogin = !(this.verifyCode && this.verifyCode.length > 0 && this.phoneNumber && this.phoneNumber.length == 11);
    },
    clickOnRadio() {
        this.termsChecked = !this.termsChecked;
    },
    requestVerifyCode() {
        this.disableRequestVerifyCode = true;
        let that = this;
        agconnect.auth().requestPhoneVerifyCode("86", this.phoneNumber, {
            action: VerifyCodeAction.REGISTER_LOGIN,
            lang: 'zh_CN',
            sendInterval: 60
        }).then(verifyCodeResult => {
            //验证码申请成功
            let intervalTime = parseInt(verifyCodeResult.getShortestInterval());

            let interval = setInterval(() => {
                that.requestVerifyCodeText = intervalTime + "秒后重发"
                intervalTime = intervalTime - 1;
                if (intervalTime <= 0) {
                    that.disableRequestVerifyCode = false;
                    that.requestVerifyCodeText = "重新获取";
                    clearInterval(interval);
                }
            }, 1000);
        }).catch(error => {
            //验证码申请失败
            prompt.showToast({
                message: '获取验证码失败，请重试'
            })
            that.disableRequestVerifyCode = false;
            that.requestVerifyCodeText = "重新获取";
        });
    },
    clickOnBtn() {
        if (!this.termsChecked) {
            prompt.showToast({
                message: '请阅读并勾选协议'
            })
            return;
        }
        if (this.loginBtnLoading) {
            return;
        }
        if (this.type === 'login') {
            this.loginByPhone();
        } else if (this.type === 'bind') {
            this.bindPhone();
        }
    },
    async bindPhone() {
        this.loginBtnLoading = true;
        try {
            let credential = PhoneAuthProvider.credentialWithVerifyCode("86", this.phoneNumber, this.verifyCode);
            const user = await agconnect.auth().getCurrentUser();
            const linkRes = await user.link(credential);
            const token = await linkRes.getUser().getToken(true);
            await getKidsWantUserInfo(uid, skey);
            goToPersonalCenter();
            this.loginBtnLoading = false;
        } catch (e) {
            handleLoginFail(e);
            this.loginBtnLoading = false;
        }
    },
    async loginByPhone() {
        this.loginBtnLoading = true;
        try {
            let credential = PhoneAuthProvider.credentialWithVerifyCode("86", this.phoneNumber, this.verifyCode);
            const result = await agconnect.auth().signIn(credential);
            const token = await result.getUser().getToken(false);
            await getKidsWantUserInfo(uid, skey);
            goToPersonalCenter();
            this.loginBtnLoading = false;
        } catch (e) {
            handleLoginFail(e);
            this.loginBtnLoading = false;
        }
    },
    goBack() {
        router.back();
    },
    clickOnTerms(event) {
        const elementId = event?.currentTarget?._id ?? '';
        let url;
        if (elementId === 'phone_login_term_personal_declare') {
            url = AGREEMENT_URLS.PERSONAL_DECLARATION_AGREEMENT;
        } else if (elementId === 'phone_login_term_private_policy') {
            url = AGREEMENT_URLS.PRIVACY_PROTECTION_POLICY;
        } else if (elementId === 'phone_login_term_child_info') {
            url = AGREEMENT_URLS.CHILDREN_PERSONAL_INFO_PROTECTION_AGREEMENT;
        }
        invokeWebView({
            url
        });
    }
}