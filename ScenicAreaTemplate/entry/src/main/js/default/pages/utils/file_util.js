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

// 将dataModel返回值中的云存储路径转化为下载链接
export async function getFileUrls(dataModel) {
    let records = dataModel?.getValue()?.data?.records;
    if (records && records instanceof Array) {
        let fileIds = [];
        records.forEach((item => {
            fileIds.push(item.picturePath);
        }));
        let fileUrls = await agconnect.lowCode().getFileURL(fileIds);
        records.forEach(item => {
            item.picturePath = fileUrls[item.picturePath];
        });
    }
    return records;
}
