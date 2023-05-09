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

import router from '@system.router'

const ICON_SUCCESS = "/media/result/success.png";
const ICON_FAILED = "/media/result/failed.png";


export default {
    data: {
        back_icon: "/media/result/back.png",
        icon: "/media/result/success.png",
        title: "预约成功",
        message: "您已成功预约 明日 2023-04-03 09:00-14:00 时段景区门票",
        param: {
            retCode: 1,
            datePeriod: "2023-04-14 09:00-14:00"
        }
    },

    onBackClick() {
        if (this.param.retCode === 0) {
            // 预约成功后返回首页
            router.clear();
            router.replace({
                uri: "pages/index/index",
                params: {
                    tableIndex: 0,
                }
            });
        } else {
            router.back();
        }
    },
    refreshDataByParam(param) {
        this.icon = param["retCode"] == 0 ? ICON_SUCCESS : ICON_FAILED;
        this.title = param["retCode"] == 0 ? "预约成功" : "预约失败";
        this.message = param["retCode"] == 0 ? `您已成功预约 ${param["datePeriod"]} 时段景区门票` : `您未能成功预约 ${param["datePeriod"]} 时段景区门票`;
    },
    onInit() {
        this.refreshDataByParam(this.param);
    }
}