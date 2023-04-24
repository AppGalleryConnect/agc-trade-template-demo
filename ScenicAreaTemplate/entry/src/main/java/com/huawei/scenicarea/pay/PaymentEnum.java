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

package com.huawei.scenicarea.pay;

import com.huawei.scenicarea.ResourceTable;
import com.huawei.scenicarea.pay.alipay.OrderInfoUtil;
import com.huawei.scenicarea.pay.alipay.PayResult;
import com.huawei.scenicarea.pay.alipay.TextUtils;

import com.alipay.sdk.app.PayTask;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

import ohos.aafwk.ability.Ability;
import ohos.global.resource.NotExistException;
import ohos.global.resource.WrongTypeException;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

public enum PaymentEnum {
    ALIPAY(1) {
        @Override
        void pay(Ability ability, String price, PaymentCallback paymentCallback) {

            /**
             * 用于支付宝支付业务的入参 app_id。
             */
            String alipayAppid = "";

            /**
             * pkcs8 格式的商户私钥。
             * <p>
             * 如下私钥，RSA2_PRIVATE 或者 RSA_PRIVATE 只需要填入一个，如果两个都设置了，本 Demo 将优先
             * 使用 RSA2_PRIVATE。RSA2_PRIVATE 可以保证商户交易在更加安全的环境下进行，建议商户使用
             * RSA2_PRIVATE。
             * <p>
             * 建议使用支付宝提供的公私钥生成工具生成和获取 RSA2_PRIVATE。
             * 工具地址：https://doc.open.alipay.com/docs/doc.htm?treeId=291&articleId=106097&docType=1
             * 注意：仅作为展示用途，实际项目中不能将 RSA_PRIVATE 和签名逻辑放在客户端进行。
             */
            String alipayRsaPrivate2 = "";
            String alipayRsaPrivate = "";
            try {
                alipayAppid = ability.getResourceManager().getElement(ResourceTable.String_alipay_appid).getString();
                alipayRsaPrivate2 = ability.getResourceManager()
                    .getElement(ResourceTable.String_alipay_rsa_private2)
                    .getString();
            } catch (IOException | NotExistException | WrongTypeException e) {
                HiLog.error(TAG, "getResource error");
            }

            if (ability == null || TextUtils.isEmpty(price) || TextUtils.isEmpty(alipayAppid) || (
                TextUtils.isEmpty(alipayRsaPrivate2) && TextUtils.isEmpty(alipayRsaPrivate))) {
                return;
            }

            /*
             * 这里只是为了方便直接向商户展示支付宝的整个支付流程；所以Demo中加签过程直接放在客户端完成；
             * 真实App里，privateKey等数据严禁放在客户端，加签过程务必要放在服务端完成；
             * 防止商户私密数据泄露，造成不必要的资金损失，及面临各种安全风险；
             *
             * orderInfo 的获取必须来自服务端；
             */
            boolean useRsa2 = (alipayRsaPrivate2.length() > 0);
            Map<String, String> params = OrderInfoUtil.buildOrderParamMap(alipayAppid,price, useRsa2);
            String orderParam = OrderInfoUtil.buildOrderParam(params);

            String privateKey = useRsa2 ? alipayRsaPrivate2 : alipayRsaPrivate;
            String sign = OrderInfoUtil.getSign(params, privateKey, useRsa2);
            final String orderInfo = orderParam + "&" + sign;
            final Runnable payRunnable = () -> {
                PayTask alipay = new PayTask(ability);
                Map<String, String> result = alipay.payV2(orderInfo, true);
                PayResult payResult = new PayResult(result);
                /**
                 * 对于支付结果，请商户依赖服务端的异步通知结果。同步通知结果，仅作为支付结束的通知。
                 */
                String resultInfo = payResult.getResult();// 同步返回需要验证的信息
                // resultStatus 为9000则代表支付成功
                if (paymentCallback != null) {
                    paymentCallback.callback(ALIPAY.paymentEnumValue, payResult.getResultStatus());
                }
            };
            // 必须异步调用
            Thread payThread = new Thread(payRunnable);
            payThread.start();
        }
    };

    private static final HiLogLabel TAG = new HiLogLabel(HiLog.LOG_APP, 0x0, PaymentEnum.class.getName());

    private int paymentEnumValue;

    PaymentEnum(int paymentEnumValue) {
        this.paymentEnumValue = paymentEnumValue;
    }

    public int getPaymentEnumValue() {
        return paymentEnumValue;
    }

    abstract void pay(Ability ability, String price, PaymentCallback paymentCallback);

    static public boolean startPay(int payment, Ability ability, String price, PaymentCallback paymentCallback) {
        Optional paymentEnumOptional = Arrays.stream(PaymentEnum.values())
            .filter(item -> item.paymentEnumValue == payment)
            .findFirst();
        if (paymentEnumOptional.isPresent()) {
            ((PaymentEnum) paymentEnumOptional.get()).pay(ability, price, paymentCallback);
            return true;
        }
        return false;
    }
}