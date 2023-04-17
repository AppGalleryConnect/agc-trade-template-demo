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

export default {
    // Start of auto-generated Super Visual code. DO NOT MODIFY
    refreshlistbanner_q90fq() {
        agconnect.lowCode().callDataModel({
            modelId: "", methodName: "list", status: 0, params: {}
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listbanner_q90fq = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    refreshlistnotice_v5gcq() {
        agconnect.lowCode().callDataModel({
            modelId: "", methodName: "list", status: 0, params: {
                conditions: []
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listnotice_v5gcq = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    refreshlistintroduce_yh08p() {
        agconnect.lowCode().callDataModel({
            modelId: "", methodName: "list", status: 0, params: {}
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listintroduce_yh08p = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    refreshlistconsolt_byj0v() {
        agconnect.lowCode().callDataModel({
            modelId: "", methodName: "list", status: 0, params: {}
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.listconsolt_byj0v = res.getValue().data.records;
            ;
        }).catch(e => {
            ;
        });
    },
    // End of auto-generated Super Visual code. DO NOT MODIFY
    data: {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        listbanner_q90fq: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            no: 0,
            pictureUrl: ""
        }],
        listnotice_v5gcq: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            no: 0,
            msg: ""
        }],
        listintroduce_yh08p: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            pictureUrl: "",
            title: ""
        }],
        listconsolt_byj0v: [{
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            no: 0,
            pictureUrl: ""
        }],
        // End of auto-generated Super Visual code. DO NOT MODIFY
        title: "Hello World"
    },
    onInit() {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshlistbanner_q90fq();
        this.refreshlistnotice_v5gcq();
        this.refreshlistintroduce_yh08p();
        this.refreshlistconsolt_byj0v();
        // End of auto-generated Super Visual code. DO NOT MODIFY

    }
}