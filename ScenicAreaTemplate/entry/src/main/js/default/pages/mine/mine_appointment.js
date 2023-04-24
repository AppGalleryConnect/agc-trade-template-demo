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
import { checkUserLoginStatus } from '../utils/auth_util';

export default {
    // Start of auto-generated Super Visual code. DO NOT MODIFY
    refreshlistreservation_order_ra4ng() {
        agconnect.lowCode().callDataModel({
            modelId: "1138480281926298177", methodName: "list", status: 0, params: {}
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listreservation_order_ra4ng = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    // End of auto-generated Super Visual code. DO NOT MODIFY
    data: {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        listreservation_order_ra4ng: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            no: 0,
            name: "",
            pic: "",
            date: "",
            time: "",
            status: "",
            action: ""
        }],
        // End of auto-generated Super Visual code. DO NOT MODIFY
    },
    onInit() {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshlistreservation_order_ra4ng();
        // End of auto-generated Super Visual code. DO NOT MODIFY
    },

    routerToBack() {
        router.back()
    },

    cancelOrDeleteAppointment(e) {
        checkUserLoginStatus(() => {
            let index = e.target._attr.data;
            console.log("cancelOrDeleteAppointment, index : " + index);
            if (index >= 0 && index < this.listreservation_order_ra4ng.length) {
                console.log("cancelOrDeleteAppointment id : " + this.listreservation_order_ra4ng[index].id);

                agconnect.lowCode().callDataModel({
                    modelId: "1136026853195171969", methodName: "delete", status: 0, params: {
                        object: {
                            id: this.listreservation_order_ra4ng[index].id
                        }
                    }
                }).then(res => {
                    const ret = res.getValue().ret;
                    console.log("ret = " + JSON.stringify(ret));
                    if (ret.code !== 0) {
                        throw new Error(JSON.stringify(ret));
                    }
                    this.refreshlistreservation_order_ra4ng();
                }).catch(e => {
                    this.refreshlistreservation_order_ra4ng();
                });
            } else {
                console.log("cancelOrDeleteAppointment index is Invalid")
            }
        }, () => {
            router.push({
                uri: 'pages/mine/mine_login',
            })
        });
    },
}