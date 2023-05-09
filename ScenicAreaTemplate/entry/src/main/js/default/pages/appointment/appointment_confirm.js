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
import { getFormatMonthDate, getWeekDate, getFormatYearMonthDate } from "../utils/time_util";
import { generateRandomNum } from '../utils/random_util';
import { phoneNumberReg, idNumberReg } from "../utils/reg_util";
import { APPOINTMENT_STATUS } from '../constant/constant';

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
            phone_no: "",
            id_no: ""
        },
        // End of auto-generated Super Visual code. DO NOT MODIFY
        appointmentInfo: {
            name: "",
            pic: "",
            scenicAreaId: ""
        },
        formInvalid: true,
        uid: "",
        buyer_info_exist: false,
        ticketNum: 1,
        isAgreementSigned: false,
        appointmentDateOffset: -1,
        appointmentTime: '',
        appointmentDateList: [{
            title: '今天',
            dayoffset: 0,
            date: getFormatMonthDate(0),
            price: '免费'
        }, {
            title: '明天',
            dayoffset: 1,
            date: getFormatMonthDate(1),
            price: '免费',
        }, {
            title: '后天',
            dayoffset: 2,
            date: getFormatMonthDate(2),
            price: '免费',
        }, {
            title: getWeekDate(3),
            dayoffset: 3,
            date: getFormatMonthDate(3),
            price: '免费',
        }, {
            title: getWeekDate(4),
            dayoffset: 4,
            date: getFormatMonthDate(4),
            price: '免费',
        }, {
            title: getWeekDate(5),
            dayoffset: 5,
            date: getFormatMonthDate(5),
            price: '免费',
        }, {
            title: getWeekDate(6),
            dayoffset: 6,
            date: getFormatMonthDate(6),
            price: '免费',
        }, {
            title: getWeekDate(7),
            dayoffset: 7,
            date: getFormatMonthDate(7),
            price: '免费',
        }, {
            title: getWeekDate(8),
            dayoffset: 8,
            date: getFormatMonthDate(8),
            price: '免费',
        }, {
            title: getWeekDate(9),
            dayoffset: 9,
            date: getFormatMonthDate(9),
            price: '免费',
        }, {
            title: getWeekDate(10),
            dayoffset: 10,
            date: getFormatMonthDate(10),
            price: '免费',
        }],
        appointmentTimeList: [{
            time: '上午 8:00-10:00'
        }, {
            time: '上午 11:00-12:00'
        }, {
            time: '下午 12:00-14:00'
        }, {
            time: '下午 14:00-16:00'
        }],
        buyerInfoInput: {
            name: "",
            id_no: "",
            phone_no: ""
        },
        userInfoInputInvalid: true,
    },
    onInit() {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshgetticket_buyer_info_dkwe8();
        // End of auto-generated Super Visual code. DO NOT MODIFY
    },
    handleDateClick(e) {
        this.appointmentDateOffset = e.currentTarget.attr.value;
        this.checkForm();
    },
    handleTimeClick(e) {
        this.appointmentTime = e.currentTarget.attr.value;
        this.checkForm();
    },
    addTicketNum() {
        this.ticketNum++;
    },
    reduceTicketNum() {
        if (this.ticketNum <= 1) {
            return;
        }
        this.ticketNum--;
    },
    signAgreement() {
        this.isAgreementSigned = !this.isAgreementSigned;
        this.checkForm();
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
        this.appointmentDateOffset >= 0 && this.appointmentTime && this.isAgreementSigned && this.buyer_info_exist);
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
    async gotoAppointmentResultPage() {
        try {
            this.makeAppointmentOkorNot(await this.makeAppointment());
        } catch (e) {
            this.makeAppointmentOkorNot(false);
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

    async makeAppointment() {
        let res = await agconnect.lowCode().callDataModel({
            modelId: "1138480281926298177", methodName: "create", status: 0, params: {
                object: {
                    // 订单号需要在云侧生成，此处仅为样例演示流程
                    id: generateRandomNum(12),
                    name: this.appointmentInfo.name,
                    pic: this.appointmentInfo.pic,
                    scenicAreaId: this.appointmentInfo.scenicAreaId,
                    date: getFormatYearMonthDate(this.appointmentDateOffset),
                    time: this.appointmentTime,
                    status: APPOINTMENT_STATUS.UNUSED // 0预约未使用；1预约已使用；2预约已取消
                }
            }
        });
        const ret = res.getValue().ret;
        return ret.code === 0;
    },

    makeAppointmentOkorNot(isSuccess) {
        router.push({
            uri: 'pages/appointment/appointment_result',
            params: {
                param: {
                    retCode: isSuccess ? 0 : -1,
                    datePeriod: getWeekDate(this.appointmentDateOffset) + " " + getFormatYearMonthDate(this.appointmentDateOffset) + " " + this.appointmentTime
                }
            }
        });
    },
    onBackClick() {
        router.back();
    },
}