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
    refreshlistticket_order_9wosb() {
        agconnect.lowCode().callDataModel({
            modelId: "1138476836657883713", methodName: "list", status: 0, params: {}
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listticket_order_9wosb = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    // End of auto-generated Super Visual code. DO NOT MODIFY
    data: {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        listticket_order_9wosb: [{
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
            action: "",
            price: "",
            number: 0,
            totalPrice: "",
            actualPay: ""
        }],
        // End of auto-generated Super Visual code. DO NOT MODIFY
    },

    onInit() {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshlistticket_order_9wosb();
        // End of auto-generated Super Visual code. DO NOT MODIFY
    },

    routerToBack() {
        router.back()
    },

    cancelOrDeleteOrder(e) {
        checkUserLoginStatus(() => {
            let index = e.target._attr.data;
            console.log("cancelOrDeleteOrder, index : " + index);

            if (index >= 0 && index < this.listticket_order_9wosb.length) {
                console.log("cancelOrDeleteOrder id : " + this.listticket_order_9wosb[index].id);

                agconnect.lowCode().callDataModel({
                    modelId: "1136031342895622721", methodName: "delete", status: 0, params: {
                        object: {
                            id: this.listticket_order_9wosb[index].id
                        }
                    }
                }).then(res => {
                    const ret = res.getValue().ret;
                    console.log("ret = " + JSON.stringify(ret));
                    if (ret.code !== 0) {
                        throw new Error(JSON.stringify(ret));
                    }
                    this.refreshlistticket_order_9wosb();
                }).catch(e => {
                    this.refreshlistticket_order_9wosb();
                });
            } else {
                console.log("cancelOrDeleteOrder index is Invalid")
            }
        }, () => {
            router.push({
                uri: 'pages/mine/mine_login',
            })
        });
    },
}