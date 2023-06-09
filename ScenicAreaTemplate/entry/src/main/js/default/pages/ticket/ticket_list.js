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
import { checkUserLoginStatus } from "../utils/auth_util"

export default {
    // Start of auto-generated Super Visual code. DO NOT MODIFY
    refreshlistticket_list_xf3ev() {
        agconnect.lowCode().callDataModel({
            modelId: "1138486647738910849", methodName: "list", status: 0, params: {
                orderBy: "no", orderType: "asc"
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listticket_list_xf3ev = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    // End of auto-generated Super Visual code. DO NOT MODIFY
    data: {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        listticket_list_xf3ev: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            name: "",
            pic: "",
            price: "",
            introduction: "",
            instruction: "",
            no: 0,
            kids_price: "",
            student_price: "",
            picture: ""
        }],
        // End of auto-generated Super Visual code. DO NOT MODIFY
    },
    onInit() {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshlistticket_list_xf3ev();
        // End of auto-generated Super Visual code. DO NOT MODIFY


    },
    startBuyTicket(e) {
        checkUserLoginStatus((user) => {
            router.push({
                uri: 'pages/ticket/ticket_buy',
                params: {
                    uid: user.getUid(),
                    ticketInfo: {
                        name: e.target.attr.data.name,
                        pic: e.target.attr.data.pic,
                        scenicAreaId: e.target.attr.data.id,
                        price: e.target.attr.data.price,
                        kidsPrice: e.target.attr.data.kids_price,
                        studentPrice: e.target.attr.data.student_price,
                    }
                }
            });
        }, () => {
            router.push({
                uri: 'pages/mine/mine_login',
            });
        });
    },
    onBackClick() {
        router.back();
    },
}