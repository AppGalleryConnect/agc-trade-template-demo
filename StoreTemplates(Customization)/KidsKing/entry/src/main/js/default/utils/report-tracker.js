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

import agconnect from "@hw-agconnect/core-harmony";

// 点击/浏览事件上报
export async function reportOnClickAndGlanceDispatch(parameter) {
    const params = {
        // 公共参数
        "fronttime": new Date().valueOf(),
        "platformid": "1",
        "platform": "06",
        "biztype": "001",
        "appid": "33",
        ...parameter
    };

    agconnect.lowCode().callConnector({
        connectorId: "1163711306625212288", methodName: "dataTracing", params: JSON.stringify(params)
    }).then(res => {
        const ret = res.getValue().ret;
        if (ret.code !== 0) {
            throw new Error(JSON.stringify(ret));
        }
        // todo 如有需要 这里处理埋点成功的回调: 业务接口返回值： res.responseBody.response  {"r":0}
    }).catch(e => {
        // todo 如有需要 这里处理埋点失败的回调
    })
}
