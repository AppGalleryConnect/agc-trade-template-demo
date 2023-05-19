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
import { uid, skey } from "../../common/mock_data";
import { handleLoginFail, getKidsWantUserInfo, goToPersonalCenter, goBack } from "../../utils/login";

export default {
    data: {
        loginDisabled: false,
        loginLoading: false,
    },
    onInit() {
        
    },
    async loginByHuaweiId() {
        if (this.loginLoading) {
            return;
        }
        this.loginLoading = true;
        try {
            const agcUser = await agconnect.auth().signIn(1);
            if (agcUser.getUser().getPhone()) {
                await getKidsWantUserInfo(uid, skey);
                this.loginLoading = false;
                goToPersonalCenter();
            } else {
                this.loginLoading = false;
                this.goToBindPhone(agcUser.getUser().getProviderInfo()[0]['phoneNumber']);
            }
        } catch (e) {
            this.loginLoading = false;
            handleLoginFail(e);
        }
    },
    goToBindPhone(phoneNumber) {
        router.push({
            uri: 'pages/phoneLogin/phoneLogin',
            params: {
                type: 'bind',
                phoneNumber: phoneNumber || '',
            }
        });
    },
    goBack() {
        goBack();
    }
}