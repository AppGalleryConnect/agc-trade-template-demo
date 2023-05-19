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

import * as queryDeliveryTips from './query-delivery-tips';


export const myHandler = async function (event, result, logger) {
  // http触发器
  let input = JSON.parse(event.body);
  let path = input.path;
  logger.info("request path:" + path);
  
  switch (path){
    case "queryDeliveryTips":
      let queryRet = await queryDeliveryTips.handle(logger);
      result.queryDeliveryTips = queryRet;
      break;
    default:
      logger.warn("does not support this path.");
  }
}