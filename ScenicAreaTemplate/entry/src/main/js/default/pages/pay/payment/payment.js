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
import "@hw-agconnect/lowcode-harmony";
import agconnect from "@hw-agconnect/core-harmony";
import { ORDER_STATUS } from '../../constant/constant';

export default {
    data: {
        totalPrice: "",
        datePeriod: "",
        orderId: "",
        paytimeText: "剩余支付时间：15:00",
        payBeforeTime: new Date(Date.now() + 15 * 60 * 1000),
        disablePay: false,
        ticketInfo: {
            id: "",
            name: "",
            pic: "",
            scenicAreaId: "",
            date: "",
            time: "",
            price: "",
            number: 0,
            totalPrice: ""
        }
    },
    onInit() {
        this.totalPrice = "￥" + this.ticketInfo.totalPrice;
        this.orderId = "订单号：" + this.ticketInfo.id;
        let that = this;
        setInterval(function () {
            that.paytimeText = "剩余支付时间：" + that.getLeftPayTime();
        }, 1000); //反复执行函数本身
    },
    startPay() {
        let action = this.initAction(1);
        let datePeriod = this.datePeriod;
        let that = this;
        FeatureAbility.subscribeAbilityEvent(action, function (payRes) {
            var resultData = JSON.parse(payRes).data;
            if (resultData.statusCode === "9000") {
                console.log("alipay ok");
                that.updateTicketBuy(ORDER_STATUS.PAID_TOBE_USED);
                router.push({
                    uri: 'pages/ticket/ticket_buy_result',
                    params: {
                        param: {
                            retCode: 0,
                            datePeriod: datePeriod,
                            ticketData: "ticketId:" + that.ticketInfo.id, // 此处订单二维码信息ticketData仅为示例，实际建议由服务端生成
                            routerFromPayment: true
                        }
                    }
                });
            } else {
                console.error("alipay failed: " + resultData.statusCode);
            }
        });
    },
    // 同步购票订单状态需要在云侧进行，此处仅为样例演示流程
    async updateTicketBuy(status) {
        // 插入订单状态为已下单未付款
        let res = await agconnect.lowCode().callDataModel({
            modelId: "1138476836657883713", methodName: "update", status: 0, params: {
                object: {
                    id: this.ticketInfo.id,
                    name: this.ticketInfo.name,
                    pic: this.ticketInfo.pic,
                    date: this.ticketInfo.date,
                    scenicAreaId: this.ticketInfo.scenicAreaId,
                    time: this.ticketInfo.time,
                    price: this.ticketInfo.price,
                    number: this.ticketInfo.number,
                    totalPrice: this.ticketInfo.totalPrice,
                    actualPay: this.ticketInfo.totalPrice,
                    status: status // 0已下单未付款，1已下单未付款已取消，2已下单已付款未使用，3已下单已付款已使用，4已下单已付款已退款
                }
            }
        })
        const ret = res.getValue().ret;
        return ret.code === 0;
    },

    initAction(code) {
        var actionData = {
            "priceValue": this.ticketInfo.totalPrice
        };
        var action = {};
        action.bundleName = "com.huawei.scenicarea";
        action.abilityName = "com.huawei.scenicarea.pay.PayAbility";
        action.messageCode = code;
        action.data = actionData;
        action.abilityType = 0;
        action.syncOption = 0;
        return action;
    },
    onBackClick() {
        router.back();
    },
    getLeftPayTime() {
        let nowTime = new Date(); //定义结束时间
        let leftTime = this.payBeforeTime.getTime() - nowTime.getTime(); //距离结束时间的毫秒数
        if (leftTime < 0) {
            this.disablePay = true;
            return "0:0"
        } else {
            this.disablePay = false;
            return Math.floor(leftTime / (1000 * 60) % 60) + ":" + Math.floor(leftTime / 1000 % 60); //返回倒计时的字符串
        }
    },
}
