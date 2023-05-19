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

const https = require("https");
let queryDeliveryTipsResult = "";

export const handle = async function (logger) {
  if (queryDeliveryTipsResult === ""){
    let resp = await queryShopCart();
    queryDeliveryTipsResult = "" + resp;
    logger.info("queryDeliveryTipsResult result:" + queryDeliveryTipsResult);
    return queryDeliveryTipsResult;
  }else{
    logger.info("queryDeliveryTips result:" + queryDeliveryTipsResult);
    return queryDeliveryTipsResult;
  }
}

async function queryShopCart(){
  const url = "https://cms.cekid.com/publish/998/shopcart.json";
  return new Promise(resolve => {
    https.get(url, res => {
      res.setEncoding("utf8");
      let result = "";
      res.on("data", data => {
        result += data;
      });
      res.on("end", () => {
        let obj = JSON.parse(result);
        if (obj && obj.data){
          resolve(obj.data.deliveryTips);
        }
      });
    });
  });
}