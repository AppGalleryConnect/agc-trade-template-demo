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
import Prompt from '@system.prompt';

const ICON_SUCCESS = "/media/result/success.png";
const ICON_FAILED = "/media/result/failed.png";
const QR_API_URL = 'https://api.qrserver.com/v1/create-qr-code';

export default {
    data: {
        icon: "/media/result/success.png",
        back_icon: "/media/result/back.png",
        title: "购票成功",
        message: "您已成功购买 明日 2023-04-03 09:00-14:00 时段景区门票",
        save_button_title: "保存到相册",
        qr_url: "",
        param: {
            retCode: 0,
            datePeriod: "明日 2023-04-14 09:00-14:00",
            ticket_data: "test"
        }
    },
    refreshDataByParam(param) {
        this.icon = param["retCode"] == 0 ? ICON_SUCCESS : ICON_FAILED;
        this.title = param["retCode"] == 0 ? "购票成功" : "购票失败";
        this.message = param["retCode"] == 0 ? `您已成功购买 ${param["datePeriod"]} 时段景区门票` : `您未能成功购买 ${param["datePeriod"]} 时段景区门票`;
        this.qr_url = param["retCode"] == 0 ? `${QR_API_URL}?data=${param["ticket_data"]}` : "";
    },
    onSaveClick() {
        Prompt.showToast({
            message: '请手动截屏以保存二维码图片'
        })
    },
    onBackClick() {
        router.back();
    },
    onInit() {
        this.refreshDataByParam(this.param)
    }
}