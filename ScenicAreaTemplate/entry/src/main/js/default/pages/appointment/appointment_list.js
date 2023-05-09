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
    refreshlistappoint_list_7x0vv() {
        agconnect.lowCode().callDataModel({
            modelId: "1138428012828608641", methodName: "list", status: 0, params: {
                orderBy: "no", orderType: "asc"
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listappoint_list_7x0vv = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    // End of auto-generated Super Visual code. DO NOT MODIFY
    data: {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        listappoint_list_7x0vv: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            no: 0,
            name: "",
            price: "",
            introduction: "",
            instruction: "",
            explanation: "",
            pic: "",
            picture: ""
        }],
        // End of auto-generated Super Visual code. DO NOT MODIFY
    },
    onInit() {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshlistappoint_list_7x0vv();
        // End of auto-generated Super Visual code. DO NOT MODIFY
        this.listappoint_list_7x0vv = [];
    },
    startAppointment(e) {
        checkUserLoginStatus((user) => {
            router.push({
                uri: 'pages/appointment/appointment_confirm',
                params: {
                    uid: user.getUid(),
                    appointmentInfo: {
                        name: e.target.attr.data.name,
                        pic: e.target.attr.data.pic,
                        scenicAreaId: e.target.attr.data.id
                    }
                }
            });
        }, () => {
            router.push({
                uri: 'pages/mine/mine_login',
            });
        });
    },
    onBackClick() {
        router.back();
    },
}