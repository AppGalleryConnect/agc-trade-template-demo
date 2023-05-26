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

const ABILITY_CODE_HUAWEIID = 1002;

export function invokeHuaweiIdLinkAbility() {
    return new Promise((resolve, reject) => {
        const action = {};
        action.bundleName = "com.kidsking.atomic";
        action.abilityName = "com.kidsking.atomic.HwIDLinkAbility";
        action.messageCode = ABILITY_CODE_HUAWEIID;
        action.data = {};
        action.abilityType = 0;
        action.syncOption = 0;
        FeatureAbility.subscribeAbilityEvent(action, function(res) {
            const resultData = JSON.parse(res).data;
            if (resultData.code === 0) {
                resolve(resultData);
            } else {
                reject(resultData);
            }
        }).catch(err => {
            reject(err);
        });
    })
}