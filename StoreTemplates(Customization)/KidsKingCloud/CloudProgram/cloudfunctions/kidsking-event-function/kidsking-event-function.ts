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

import * as httpTrigger from './http-trigger/handler';
import * as authTrigger from './auth-trigger/handler';

let myHandler = async function (event, context, callback, logger) {
  let result = {
    "code": 0,
    "errMsg": ""
  };

  try {
    await doOperate(event, result, logger);
  } catch (e) {
    logger.error("do operate exception:"+ e.stack);
    result.code = 500;
    result.errMsg = e.message;
  }

  callback(result);
};

async function doOperate(event, result, logger) {
  if (!event) {
    logger.info("the input event is empty.");
    return;
  }

  if (event.httpMethod){
   await httpTrigger.myHandler(event, result, logger);
  }else if (event.providers && event.op){
    await authTrigger.myHandler(event, result, logger);
  }
}

export { myHandler }