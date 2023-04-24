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

export default {
    data: {
        totalPrice: "￥20.00",
        priceValue: "",
        datePeriod: "",
        paymentSelect: {
            "weixin": true, "alipay": false
        },
        paytimeText :"剩余支付时间：15:00",
        payBeforeTime: new Date(Date.now() + 15 * 60 * 1000),
        disablePay: false
    },
    onInit() {

        this.totalPrice = "￥" + this.priceValue;
        let that = this;
        setInterval (function () {
            that.paytimeText = "剩余支付时间：" + that.getLeftPayTime();
        }, 1000);  //反复执行函数本身
    },
    startPay() {
        let action = this.initAction(this.paymentSelect["weixin"] ? 0 : 1);
        let datePeriod = this.datePeriod;
        FeatureAbility.subscribeAbilityEvent(action, function (payRes) {
            var resultData = JSON.parse(payRes).data;
            if (resultData.statusCode === "9000") {
                console.log("alipay ok");
                router.push({
                    uri: 'pages/ticket/ticket_buy_result',
                    params: {
                        param: {
                            retCode: 0,
                            datePeriod: datePeriod,
                            ticket_data: "xxxx"
                        }
                    }
                });
            } else {
                console.error("alipay failed: " + resultData.statusCode);
            }
        });
    },
    switchPayment(e) {
        this.paymentSelect = {
            "weixin": false, "alipay": false
        };
        this.paymentSelect[e.currentTarget.attr.value] = true;
    },

    initAction(code) {
        var actionData = {
            "priceValue": this.priceValue
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
