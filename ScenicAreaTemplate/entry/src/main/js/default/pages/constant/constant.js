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

// 0预约未使用；1预约已使用；2预约已取消
export const APPOINTMENT_STATUS = {
    UNUSED: "0",
    USED: "1",
    CANCELED: "2"
};

// 0已下单未付款，1已下单未付款已取消，2已下单已付款未使用，3已下单已付款已使用，4已下单已付款已退款
export const ORDER_STATUS = {
    UNPAID: "0",
    UNPAID_CANCELED: "1",
    PAID_TOBE_USED: "2",
    PAID_USED: "3",
    PAID_UNUSED_REFUND: "4"
}