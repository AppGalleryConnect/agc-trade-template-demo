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
import "@hw-agconnect/auth-harmony";
import agconnect from "@hw-agconnect/core-harmony";
import router from '@system.router';
import { getFormatMonthDate, getWeekDate, getFormatYearMonthDate } from "../utils/time_util";
import { generateRandomNum } from '../utils/random_util';
import { phoneNumberReg, idNumberReg } from "../utils/reg_util";
import { ORDER_STATUS } from '../constant/constant';

export default {
    // Start of auto-generated Super Visual code. DO NOT MODIFY
    refreshgetticket_buyer_info_dkwe8() {
        agconnect.lowCode().callDataModel({
            modelId: "1138426535989004417", methodName: "get", status: 0, params: {
                primaryKey: {
                    field: "uid", value: this.uid
                }
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.getticket_buyer_info_dkwe8 = res.getValue().data.record;
            this.getBuyerInfo(res);
        }).catch(e => {
            ;
        });
    },
    // End of auto-generated Super Visual code. DO NOT MODIFY
    data: {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        getticket_buyer_info_dkwe8: {
            uid: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            name: "",
            id_no: "",
            phone_no: ""
        },
        // End of auto-generated Super Visual code. DO NOT MODIFY
        buyer_info_exist: false,
        formInvalid: true,
        uid: "",
        ticketNum: 1,
        ticketTime: '',
        ticketType: '',
        totalPrice: '￥0',
        ticketDateOffset: -1,
        ticketTypeOptions: [],
        perTicketPrice: 0,
        ticketDateList: [{}],
        ticketTimeList: [{
            time: '上午 8:00-10:00'
        }, {
            time: '上午 11:00-12:00'
        }, {
            time: '下午 12:00-14:00'
        }, {
            time: '下午 14:00-16:00'
        }],
        ticketInfo: {
            name: "",
            pic: "",
            scenicAreaId: "",
            price: "",
            kidsPrice: "",
            studentPrice: ""
        },
        orderId: "",
        buyerInfoInput: {
            name: "",
            id_no: "",
            phone_no: ""
        },
        userInfoInputInvalid: true,
    },
    async onInit() {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshgetticket_buyer_info_dkwe8();
        // End of auto-generated Super Visual code. DO NOT MODIFY
        this.ticketTypeOptions = [{
            title: '成人票￥' + this.ticketInfo.price,
            price: this.ticketInfo.price,
            key: 'adult',
        }, {
            title: '学生票￥' + this.ticketInfo.studentPrice,
            price: this.ticketInfo.studentPrice,
            key: 'student',
        }, {
            title: '儿童票￥' + this.ticketInfo.kidsPrice,
            price: this.ticketInfo.kidsPrice,
            key: 'child',
        }],
        this.perTicketPrice = this.ticketTypeOptions[0].price;
        this.updateDateList();
    },
    handleDateClick(e) {
        this.ticketDateOffset = e.currentTarget.attr.value;
        this.checkForm();
    },
    handleTimeClick(e) {
        this.ticketTime = e.currentTarget.attr.value;
        this.checkForm();
    },
    handleTypeClick(e) {
        this.ticketType = e.currentTarget.attr.value;
        this.updateTotalPrice();
        this.checkForm();
    },
    addTicketNum() {
        this.ticketNum++;
        this.updateTotalPrice();
    },
    reduceTicketNum() {
        if (this.ticketNum <= 1) {
            return;
        }
        this.ticketNum--;
        this.updateTotalPrice();
    },
    updateTotalPrice() {
        if (!this.ticketType) {
            return '￥0';
        }
        this.perTicketPrice = this.ticketTypeOptions.find(item => item.key === this.ticketType).price;
        this.updateDateList();
        this.totalPrice = '￥' + this.perTicketPrice * this.ticketNum;
    },
    updateDateList() {
        this.ticketDateList = [{
            title: '今天',
            dayoffset: 0,
            date: getFormatMonthDate(0),
            price: '￥' + this.perTicketPrice,
        }, {
            title: '明天',
            dayoffset: 1,
            date: getFormatMonthDate(1),
            price: '￥' + this.perTicketPrice,
        }, {
            title: '后天',
            dayoffset: 2,
            date: getFormatMonthDate(2),
            price: '￥' + this.perTicketPrice,
        }, {
            title: getWeekDate(3),
            dayoffset: 3,
            date: getFormatMonthDate(3),
            price: '￥' + this.perTicketPrice,
        }, {
            title: getWeekDate(4),
            dayoffset: 4,
            date: getFormatMonthDate(4),
            price: '￥' + this.perTicketPrice,
        }, {
            title: getWeekDate(5),
            dayoffset: 5,
            date: getFormatMonthDate(5),
            price: '￥' + this.perTicketPrice,
        }, {
            title: getWeekDate(6),
            dayoffset: 6,
            date: getFormatMonthDate(6),
            price: '￥' + this.perTicketPrice,
        }, {
            title: getWeekDate(7),
            dayoffset: 7,
            date: getFormatMonthDate(7),
            price: '￥' + this.perTicketPrice,
        }, {
            title: getWeekDate(8),
            dayoffset: 8,
            date: getFormatMonthDate(8),
            price: '￥' + this.perTicketPrice,
        }, {
            title: getWeekDate(9),
            dayoffset: 9,
            date: getFormatMonthDate(9),
            price: '￥' + this.perTicketPrice,
        }, {
            title: getWeekDate(10),
            dayoffset: 10,
            date: getFormatMonthDate(10),
            price: '￥' + this.perTicketPrice,
        }];
    },
    showInstruction() {
        this.$element('dialog-instruction').show();
    },
    hideShowInstruction() {
        this.$element('dialog-instruction').close();
    },
    showUserDialog() {
        this.buyerInfoInput.id_no = this.getticket_buyer_info_dkwe8.id_no;
        this.buyerInfoInput.name = this.getticket_buyer_info_dkwe8.name;
        this.buyerInfoInput.phone_no = this.getticket_buyer_info_dkwe8.phone_no;
        this.userInfoInputInvalid = !(this.buyerInfoInput.name && phoneNumberReg.test(this.buyerInfoInput.phone_no) && idNumberReg.test(this.buyerInfoInput.id_no));
        this.$element('dialog-user').show();
    },
    hideUserDialog() {
        this.$element('dialog-user').close();
    },
    handleUserChange(e) {
        const name = e.target.attr.name;
        this.buyerInfoInput[name] = e.value;
        this.userInfoInputInvalid = !(this.buyerInfoInput.name && phoneNumberReg.test(this.buyerInfoInput.phone_no) && idNumberReg.test(this.buyerInfoInput.id_no));
    },
    checkForm() {
        this.formInvalid = !(this.getticket_buyer_info_dkwe8.uid && this.getticket_buyer_info_dkwe8.name &&
        this.getticket_buyer_info_dkwe8.id_no && this.getticket_buyer_info_dkwe8.phone_no &&
        this.ticketDateOffset >= 0 && this.ticketTime && this.ticketType);
    },
    onBackClick() {
        router.back();
    },
    getBuyerInfo(res) {
        if (res.getValue().data.record?.uid) {
            this.buyer_info_exist = true;
            this.getticket_buyer_info_dkwe8 = res.getValue().data.record;
            this.buyerInfoInput.id_no = this.getticket_buyer_info_dkwe8.id_no;
            this.buyerInfoInput.name = this.getticket_buyer_info_dkwe8.name;
            this.buyerInfoInput.phone_no = this.getticket_buyer_info_dkwe8.phone_no;
        } else {
            this.buyer_info_exist = false;
            this.getticket_buyer_info_dkwe8 = {
                uid: this.uid,
                createTime: "",
                updateTime: "",
                owner: "",
                createBy: "",
                updateBy: "",
                name: "",
                id_no: "",
                phone_no: ""
            };
        }
    },

    async payButtonClick() {
        try {
            if (await this.insertNewTicketBuy()) {
                this.gotoPaymentPage();
                return;
            }
            this.gotoBuyFailPage();
        } catch (e) {
            this.gotoBuyFailPage();
        }
    },
    async updateUserInfo() {
        if (!this.userInfoInputInvalid) {
            let res = await agconnect.lowCode().callDataModel({
                modelId: "1138426535989004417",
                methodName: this.buyer_info_exist ? "update" : "create",
                status: 0,
                params: {
                    object: {
                        uid: this.getticket_buyer_info_dkwe8.uid,
                        id_no: this.buyerInfoInput.id_no,
                        name: this.buyerInfoInput.name,
                        phone_no: this.buyerInfoInput.phone_no
                    }
                }
            })
            const ret = res.getValue().ret;
            if (ret?.code === 0) {
                this.buyer_info_exist = true;
                this.getticket_buyer_info_dkwe8.id_no = this.buyerInfoInput.id_no;
                this.getticket_buyer_info_dkwe8.name = this.buyerInfoInput.name;
                this.getticket_buyer_info_dkwe8.phone_no = this.buyerInfoInput.phone_no;
            }
            this.hideUserDialog();
            this.checkForm();
        }
    },

    async insertNewTicketBuy() {
        // 订单号需要在云侧生成，此处仅为样例演示流程
        this.orderId = generateRandomNum(12);
        // 插入订单状态为已下单未付款
        let res = await agconnect.lowCode().callDataModel({
            modelId: "1138476836657883713", methodName: "create", status: 0, params: {
                object: {
                    id: this.orderId,
                    name: this.ticketInfo.name,
                    pic: this.ticketInfo.pic,
                    scenicAreaId: this.ticketInfo.scenicAreaId,
                    date: getFormatYearMonthDate(this.ticketDateOffset),
                    time: this.ticketTime,
                    price: this.perTicketPrice,
                    number: this.ticketNum,
                    totalPrice: this.perTicketPrice * this.ticketNum,
                    status: ORDER_STATUS.UNPAID // 0已下单未付款，1已下单未付款已取消，2已下单已付款未使用，3已下单已付款已使用，4已下单已付款已退款
                }
            }
        })
        const ret = res.getValue().ret;
        return ret.code === 0
    },
    gotoPaymentPage() {
        let datePeriod = getWeekDate(this.ticketDateOffset) + " " + getFormatYearMonthDate(this.ticketDateOffset) + " " + this.ticketTime
        router.push({
            uri: 'pages/pay/payment/payment',
            params: {
                datePeriod: datePeriod,
                ticketInfo: {
                    id: this.orderId,
                    name: this.ticketInfo.name,
                    pic: this.ticketInfo.pic,
                    scenicAreaId: this.ticketInfo.scenicAreaId,
                    date: getFormatYearMonthDate(this.ticketDateOffset),
                    time: this.ticketTime,
                    price: this.perTicketPrice,
                    number: this.ticketNum,
                    totalPrice: this.perTicketPrice * this.ticketNum
                }
            }
        });
    },
    gotoBuyFailPage() {
        let datePeriod = getWeekDate(this.ticketDateOffset) + " " + getFormatYearMonthDate(this.ticketDateOffset) + " " + this.ticketTime
        router.push({
            uri: 'pages/ticket/ticket_buy_result',
            params: {
                param: {
                    retCode: -1,
                    datePeriod: datePeriod,
                }
            }
        });
    }
}