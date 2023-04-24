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

export function getFormatMonthDate(dayoffset) {
    let date = new Date(Date.now() + dayoffset * 24 * 60 * 60 * 1000);

    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return month + "-" + strDate;
}

export function getFormatYearMonthDate(dayoffset) {
    let date = new Date(Date.now() + dayoffset * 24 * 60 * 60 * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return year + "-" + month + "-" + strDate;
}

export function getWeekDate(dayoffset) {
    let time = new Date(Date.now() + dayoffset * 24 * 60 * 60 * 1000);
    let weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

    let date = new Date(time);
    let day = date.getDay();
    return weeks[day];
}
