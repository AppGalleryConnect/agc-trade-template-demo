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
import router from '@system.router';
import { checkUserLoginStatus } from "../utils/auth_util"

export default {
    // Start of auto-generated Super Visual code. DO NOT MODIFY
    refreshlistticket_list_1fzlm() {
        agconnect.lowCode().callDataModel({
            modelId: "1134565724640036993", methodName: "list", status: 0, params: {
                orderBy: "no", orderType: "asc", conditions: []
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listticket_list_1fzlm = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    // End of auto-generated Super Visual code. DO NOT MODIFY
    data: {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        listticket_list_1fzlm: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            name: "",
            pic: "",
            price: "",
            introduction: "",
            instruction: "",
            no: 0
        }],
        // End of auto-generated Super Visual code. DO NOT MODIFY
        title: "Hello World"
    },
    onInit() {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshlistticket_list_1fzlm();
        // End of auto-generated Super Visual code. DO NOT MODIFY

    },
    startBuyTicket() {
        checkUserLoginStatus((user) => {
            router.push({
                uri: 'pages/ticket/ticket_buy',
                params: {
                    uid: user.getUid()
                }
            });
        }, () => {
            router.push({
                uri: 'pages/mine/mine_login',
            });
        });
    },
}