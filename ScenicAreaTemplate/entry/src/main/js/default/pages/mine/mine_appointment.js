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
import { APPOINTMENT_STATUS } from '../constant/constant';

export default {
    // Start of auto-generated Super Visual code. DO NOT MODIFY
    refreshlistreservation_order_ra4ng() {
        agconnect.lowCode().callDataModel({
            modelId: "1138480281926298177", methodName: "list", status: 0, params: {
                orderBy: "createTime", orderType: "desc", conditions: []
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listreservation_order_ra4ng = res.getValue().data.records;
            this.showAction(res);
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
            scenicAreaId: ""
        }],
        // End of auto-generated Super Visual code. DO NOT MODIFY
        statusMap: {
            "0": "待使用",
            "1": "已使用",
            "2": "已取消",
        },
        actionMap: {
            "0": "取消订单",
            "1": "删除订单",
            "2": "删除订单",
        },

        // status:0预约未使用；1预约已使用；2预约已取消
        orderList: [],
    },
    onInit() {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshlistreservation_order_ra4ng();
        // End of auto-generated Super Visual code. DO NOT MODIFY
    },
    onShow() {
        this.refreshlistreservation_order_ra4ng();
    },

    routerToBack() {
        router.back()
    },

    showAction(res) {
        this.orderList = [];
        if (this.listreservation_order_ra4ng && this.listreservation_order_ra4ng.length > 0) {
            this.listreservation_order_ra4ng.forEach(item => {
                this.orderList.push(item);
                this.orderList[this.orderList.length-1].usingStatus = this.getUsingStatus(item.status);
                this.orderList[this.orderList.length-1].action = this.getAction(item.status);
            });
        }
    },

    getUsingStatus(status) {
        // 0预约未使用；1预约已使用；2预约已取消
        return this.statusMap[status];
    },
    getAction(status) {
        return this.actionMap[status];
    },
    deleteAppointment(id) {
        agconnect.lowCode().callDataModel({
            modelId: "1138480281926298177", methodName: "delete", status: 0, params: {
                object: {
                    id: id
                }
            }
        }).then(res => {
            this.refreshlistreservation_order_ra4ng();
        }).catch(e => {
            this.refreshlistreservation_order_ra4ng();
        });
    },

    updateAppointmentStatus(id, status) {
        if (this.listreservation_order_ra4ng && this.listreservation_order_ra4ng.length > 0) {
            let order = this.listreservation_order_ra4ng.find(item => item.id === id)
            if (order) {
                agconnect.lowCode().callDataModel({
                    modelId: "1138480281926298177", methodName: "update", status: 0, params: {
                        object: {
                            id: order.id,
                            no: order.no,
                            name: order.name,
                            pic: order.pic,
                            date: order.date,
                            time: order.time,
                            status: status
                        }
                    }
                }).then(res => {
                    this.refreshlistreservation_order_ra4ng();
                }).catch(e => {
                    this.refreshlistreservation_order_ra4ng();
                });
            }
        }
    },

    cancelOrDeleteAppointment(e) {
        let that = this;
        checkUserLoginStatus(() => {
            if (e.target.attr.data.status === APPOINTMENT_STATUS.UNUSED) {
                that.updateAppointmentStatus(e.target.attr.data.id, APPOINTMENT_STATUS.CANCELED);
            }
            if (e.target.attr.data.status === APPOINTMENT_STATUS.USED || e.target.attr.data.status === APPOINTMENT_STATUS.CANCELED) {
                that.deleteAppointment(e.target.attr.data.id);
            }
        }, () => {
            router.push({
                uri: 'pages/mine/mine_login',
            })
        });
    },
}