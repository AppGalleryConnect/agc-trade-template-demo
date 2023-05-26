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

import app from '@system.app';
import storage from '@system.storage';
import { COOKIE_DOMAIN } from '../common/constants';

const ABILITY_CODE_WEBVIEW = 1001;

export async function invokeWebView(data) {
    try {
        const loginInfo = await readFromStorage();
        data.uid = loginInfo?.uid ?? '';
        data.skey = loginInfo?.skey ?? '';
        data.domain = COOKIE_DOMAIN;
        const action = {
            bundleName: app.getInfo().appID,
            abilityName: 'com.kidsking.atomic.WebviewAbility',
            messageCode: ABILITY_CODE_WEBVIEW,
            data,
            abilityType: 0,
            syncOption: 0,
        };
        const result = await FeatureAbility.startAbility(action);
        console.log("Invoke webview result. Code: " + result.code + " Result: " + result.data);
    } catch (e) {
        console.error("Invoke webview error: " + JSON.stringify(e));
    }
}

function readFromStorage() {
    return new Promise((resolve, reject) => {
       storage.get({
           key: 'loginInfo',
           success: (data) => {
               if (data) {
                   resolve(JSON.parse(data));
               } else {
                   resolve(null);
               }
           },
           fail: (data, code) => {
               reject(new Error(code));
           }
       })
    });
}