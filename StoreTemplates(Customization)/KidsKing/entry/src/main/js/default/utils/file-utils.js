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
export async function getFileUrls(list, key = 'pic') {
  try {
	if (list && list instanceof Array) {
	  let fileIds = [];
	  list.forEach((item => {
		item[key] && fileIds.push(item[key]);
	  }));
	  let fileUrls = await agconnect.lowCode().getFileURL(fileIds);
	  list.forEach(item => {
		item[key] = fileUrls[item[key]];
	  });
	}
	return list;
  } catch (error) {
	console.error(`getFileUrls error, ${JSON.stringify(error)}`)
	return list;
  }
}
