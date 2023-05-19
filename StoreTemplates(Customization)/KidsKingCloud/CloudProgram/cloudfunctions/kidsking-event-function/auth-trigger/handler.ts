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

export const myHandler = async function (event, result, logger) {
  // http触发器
  let op = event.op;
  let uid = event.uid;
  // 0: 用户注册; 1：用户销户; 2：用户登录; 3：用户登出.
  logger.info(`receive auth trigger op is:${op}, uid:${uid}.`);

  switch (op){
    case "0":
          // 业务做对应的逻辑处理
    case "1":
    case "2":
    case "3":
      logger.info("process auth trigger end.");
      break;
    default:
      logger.warn("does not support this op type.");
  }
}