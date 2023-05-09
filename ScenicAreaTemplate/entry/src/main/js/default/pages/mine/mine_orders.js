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
import { getFormatYearMonthDate, getWeekDate } from '../utils/time_util';
import { ORDER_STATUS } from '../constant/constant';

export default {
    // Start of auto-generated Super Visual code. DO NOT MODIFY
    refreshlistticket_order_9wosb() {
        agconnect.lowCode().callDataModel({
            modelId: "1138476836657883713", methodName: "list", status: 0, params: {
                orderBy: "createTime", orderType: "desc"
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listticket_order_9wosb = res.getValue().data.records;
            this.showAction(res);
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
            price: "",
            number: 0,
            totalPrice: "",
            actualPay: "",
            scenicAreaId: ""
        }],
        // End of auto-generated Super Visual code. DO NOT MODIFY


        // 0已下单未付款，1已下单已取消，2已下单已付款未使用，3已下单已付款已使用
        orderList: [],
        statusMap: {
            "0": "待付款",
            "1": "已取消",
            "2": "待使用",
            "3": "已使用",
        },
        actionMap: {
            "0": "去支付",
            "1": "删除订单",
            "2": "取消订单",
            "3": "删除订单",
        },
    },

    onInit() {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshlistticket_order_9wosb();
        // End of auto-generated Super Visual code. DO NOT MODIFY
    },
    onShow() {
        this.refreshlistticket_order_9wosb();
    },
    showAction(res) {
        this.orderList = [];
        if (this.listticket_order_9wosb && this.listticket_order_9wosb.length > 0) {
            this.listticket_order_9wosb.forEach(item => {
                this.orderList.push(item);
                this.orderList[this.orderList.length-1].usingStatus = this.getUsingStatus(item.status);
                this.orderList[this.orderList.length-1].action = this.getAction(item.status);
            });
        }
    },
    getUsingStatus(status) {
        return this.statusMap[status];
    },
    getAction(status) {
        return this.actionMap[status];
    },
    routerToBack() {
        router.back()
    },

    orderClick(e) {
        let that = this;
        checkUserLoginStatus(() => {
            if (e.target.attr.data.status === ORDER_STATUS.PAID_TOBE_USED) {
                that.gotoTicketDetailPage(e.target.attr.data);
            }
        }, () => {
            router.push({
                uri: 'pages/mine/mine_login',
            })
        });
    },

    orderAction(e) {
        let that = this;
        checkUserLoginStatus(() => {
            if (e.target.attr.data.status === ORDER_STATUS.UNPAID) {
                that.gotoPaymentPage(e.target.attr.data);
            }
            if (e.target.attr.data.status === ORDER_STATUS.PAID_TOBE_USED) {
                that.cancelOrder(e.target.attr.data);
            }
            if (e.target.attr.data.status === ORDER_STATUS.UNPAID_CANCELED || e.target.attr.data.status === ORDER_STATUS.PAID_USED) {
                that.deleteOrder(e.target.attr.data.id);
            }
        }, () => {
            router.push({
                uri: 'pages/mine/mine_login',
            })
        });
    },
    cancelOrder(orderInfo) {
        agconnect.lowCode().callDataModel({
            modelId: "1138476836657883713", methodName: "update", status: 0, params: {
                object: {
                    id: orderInfo.id,
                    no: orderInfo.no,
                    name: orderInfo.name,
                    pic: orderInfo.pic,
                    date: orderInfo.date,
                    time: orderInfo.time,
                    status: ORDER_STATUS.UNPAID_CANCELED,
                    price: orderInfo.price,
                    number: orderInfo.number,
                    totalPrice: orderInfo.totalPrice,
                    actualPay: orderInfo.actualPay,
                }
            }
        }).then(res => {
            this.refreshlistticket_order_9wosb();
        }).catch(e => {
            this.refreshlistticket_order_9wosb();
        });
    },
    deleteOrder(id) {
        agconnect.lowCode().callDataModel({
            modelId: "1138476836657883713", methodName: "delete", status: 0, params: {
                object: {
                    id: id
                }
            }
        }).then(res => {
            this.refreshlistticket_order_9wosb();
        }).catch(e => {
            this.refreshlistticket_order_9wosb();
        });
    },
    gotoPaymentPage(orderInfo) {
        let datePeriod = orderInfo.date + " " + orderInfo.time
        router.push({
            uri: 'pages/pay/payment/payment',
            params: {
                datePeriod: datePeriod,
                ticketInfo: {
                    id: orderInfo.id,
                    name: orderInfo.name,
                    pic: orderInfo.pic,
                    date: orderInfo.date,
                    time: orderInfo.time,
                    price: orderInfo.price,
                    number: orderInfo.number,
                    totalPrice: orderInfo.totalPrice
                }
            }
        });
    },
    gotoTicketDetailPage(orderInfo) {
        router.push({
            uri: 'pages/ticket/ticket_buy_result',
            params: {
                param: {
                    retCode: 0,
                    routerFromPayment: false,
                    ticketData: "ticketId:" + orderInfo.id, // 此处订单二维码信息ticketData仅为示例，实际建议由服务端生成
                }
            }
        });
    }
}