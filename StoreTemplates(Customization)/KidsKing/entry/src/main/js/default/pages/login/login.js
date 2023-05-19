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
import prompt from '@system.prompt';
import { AGREEMENT_URLS } from '../../common/constants';
import { invokeWebView } from '../../common/invoke_webview';

export default {
    data: {
        title: '',
        termsChecked: false,
    },
    onInit() {
        
    },
    loginByPhone() {
        if (!this.termsChecked) {
            prompt.showToast({
                message: '请阅读并勾选协议'
            })
            return;
        }
        router.push({
            uri: 'pages/phoneLogin/phoneLogin',
            params: {
                type: 'login'
            }
        });
    },
    loginByHuaweiId() {
        if (!this.termsChecked) {
            prompt.showToast({
                message: '请阅读并勾选协议'
            })
            return;
        }
        router.push({
            uri: 'pages/huaweiLogin/huaweiLogin',
        });
    },
    goToPersonalCenter() {
        router.push({
            uri: 'pages/personalCenter/personalCenter',
        });
    },
    clickOnTerms(event) {
        const elementId = event?.currentTarget?._id ?? '';
        let url;
        if (elementId === 'term_personal_declare') {
            url = AGREEMENT_URLS.PERSONAL_DECLARATION_AGREEMENT;
        } else if (elementId === 'term_private_policy') {
            url = AGREEMENT_URLS.PRIVACY_PROTECTION_POLICY;
        } else if (elementId === 'term_child_info') {
            url = AGREEMENT_URLS.CHILDREN_PERSONAL_INFO_PROTECTION_AGREEMENT;
        } else if (elementId === 'term_huawei_service') {
            url = AGREEMENT_URLS.HUAWEI_SERVICE_AGREEMENT;
        }
        invokeWebView({
            url
        });
    },
    clickOnTermsCheckbox() {
        this.termsChecked = !this.termsChecked;
    },
}