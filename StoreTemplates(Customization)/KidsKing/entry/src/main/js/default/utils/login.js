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
import prompt from '@system.prompt';
import router from '@system.router';
import storage from '@system.storage';

async function getUserInfo(uid, skey) {
    const res = await agconnect.lowCode().callConnector({
        connectorId: "1151261566537100224", methodName: "getUserInfo", params: JSON.stringify({
            uid, skey
        })
    });
    const ret = res.getValue().ret;
    const response = res.getValue().response;
    if (ret.code === 0) {
        return JSON.parse(response).data;
    } else {
        return null;
    }
}

export async function loginKidswant(jwt) {
    const res = await agconnect.lowCode().callConnector({
        connectorId: "1157064775251811648", methodName: "loginByHWHarMony", params: JSON.stringify({ jwt })
    });
    const ret = res.getValue().ret;
    const response = res.getValue().response;
    if (ret.code === 0) {
        return JSON.parse(response).data;
    } else {
        return null;
    }
}

export async function getKidsWantUserInfo(jwt) {
    const loginRet = await loginKidswant(jwt);
    if (!loginRet){
        handleLoginFail();
    }
    const uid = loginRet.uid;
    const skey = loginRet.skey;

    const userInfo = await getUserInfo(uid, skey);
    if (!userInfo) {
        handleLoginFail();
    }
    await setUserInfoToStorage(userInfo);
    await setLoginInfoToStorage(uid, skey);
}

export function setUserInfoToStorage(userInfo) {
    return new Promise((resolve, reject) => {
        storage.set({
            key: 'userInfo',
            value: JSON.stringify(userInfo),
            success: () => {
                resolve();
            },
            fail: (data, code) => {
                reject(new Error(code));
            }
        })
    })

}

export function setLoginInfoToStorage(uid, skey) {
    return new Promise((resolve, reject) => {
        storage.set({
            key: 'loginInfo',
            value: JSON.stringify({
                uid, skey
            }),
            success: () => {
                resolve();
            },
            fail: (data, code) => {
                reject(new Error(code));
            }
        });
    });

}

export function goToPersonalCenter() {
    router.push({
        uri: 'pages/personalCenter/personalCenter',
    });
}

export function goToLoginPage() {
    router.push({
        uri: 'pages/login/login',
    });
}

export function goBack() {
    router.back();
}

export function handleLoginFail(e) {
    console.log('Login failed, error: ' + JSON.stringify(e));
    if (e && e.code === 203818129) {
        return prompt.showToast({
            message: '验证码错误'
        });
    } else if (e && e.code === 203818039) {
        return prompt.showToast({
            message: '该手机号已绑定其它华为账号，请更换手机号'
        });
    } else {
        prompt.showToast({
            message: '登录失败，请稍后重试'
        })
        agconnect.auth().signOut().finally(() => {
            goToLoginPage();
        });
    }
}