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

import com.alipay.sdk.app.EnvUtils;

import java.util.HashMap;
import java.util.Map;

import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;
import ohos.rpc.IRemoteBroker;
import ohos.rpc.IRemoteObject;
import ohos.rpc.MessageOption;
import ohos.rpc.MessageParcel;
import ohos.rpc.RemoteException;
import ohos.rpc.RemoteObject;
import ohos.utils.zson.ZSONException;
import ohos.utils.zson.ZSONObject;

public class PayAbility extends Ability {
    private static final HiLogLabel TAG = new HiLogLabel(HiLog.LOG_APP, 0x0, PayAbility.class.getName());

    private PayJavaRemote remote = new PayJavaRemote();

    @Override
    protected IRemoteObject onConnect(Intent intent) {
        super.onConnect(intent);
        return remote.asObject();
    }

    private class PayJavaRemote extends RemoteObject implements IRemoteBroker {
        private IRemoteObject remoteObjectHandler ;

        PayJavaRemote() {
            super("PayJavaRemote");
        }

        @Override
        public boolean onRemoteRequest(int code, MessageParcel data, MessageParcel reply, MessageOption option) {
            IRemoteObject remoteObject = data.readRemoteObject();
            if (remoteObject != null) {
                remoteObjectHandler = remoteObject;
                String dataStr = data.readString();
                PaymentRequest paymentRequest;
                try {
                    paymentRequest = ZSONObject.stringToClass(dataStr, PaymentRequest.class);
                    return PaymentEnum.startPay(code, PayAbility.this, paymentRequest.getPriceValue(),
                        (responseCode, statusCode) -> {
                            Map<String, Object> res = new HashMap<>();
                            res.put("statusCode", statusCode);
                            MessageParcel callbackData = MessageParcel.obtain();
                            MessageParcel callbackReply = MessageParcel.obtain();
                            MessageOption callbackOption = new MessageOption();
                            callbackData.writeString(ZSONObject.toZSONString(res));
                            if (remoteObjectHandler != null) {
                                try {
                                    remoteObjectHandler.sendRequest(responseCode, callbackData, callbackReply,
                                        callbackOption);
                                } catch (RemoteException e) {
                                    HiLog.error(TAG, "RemoteException with code: " + responseCode);
                                }
                            }
                            callbackReply.reclaim();
                            callbackData.reclaim();
                        });
                } catch (ZSONException e) {
                    HiLog.error(TAG, "convert PaymentRequest failed.");
                }
            }
            return false;
        }

        @Override
        public IRemoteObject asObject() {
            return this;
        }
    }

    @Override
    protected void onStart(Intent intent) {
        // 支付宝沙箱调试用，真实环境请删除此代码
        EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
        super.onStart(intent);
    }
}

