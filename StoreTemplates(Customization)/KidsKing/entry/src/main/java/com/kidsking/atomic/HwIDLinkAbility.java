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

package com.kidsking.atomic;

import com.huawei.agconnect.AGConnectInstance;
import com.huawei.agconnect.auth.AGCAuthException;
import com.huawei.agconnect.auth.AGConnectAuth;
import com.huawei.agconnect.auth.AGConnectAuthCredential;
import com.huawei.agconnect.auth.SignInResult;
import com.huawei.agconnect.auth.api.AuthLoginListener;
import com.huawei.agconnect.auth.huawei.HuaweiAuthApiImpl;
import com.huawei.hmf.tasks.HarmonyTask;
import com.huawei.hmf.tasks.OnFailureListener;
import com.huawei.hmf.tasks.OnHarmonyCompleteListener;

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

public class HwIDLinkAbility extends Ability {
    private static final HiLogLabel TAG = new HiLogLabel(HiLog.LOG_APP, 0x0, HwIDLinkAbility.class.getName());

    private LinkRemote remote = new LinkRemote();

    @Override
    protected IRemoteObject onConnect(Intent intent) {
        super.onConnect(intent);
        return remote.asObject();
    }

    private class LinkRemote extends RemoteObject implements IRemoteBroker {
        private IRemoteObject remoteObjectHandler;

        LinkRemote() {
            super("LinkRemote");
        }

        @Override
        public boolean onRemoteRequest(int code, MessageParcel data, MessageParcel reply, MessageOption option) {
            if (code != 1002) {
                return false;
            }
            IRemoteObject remoteObject = data.readRemoteObject();
            if (remoteObject != null) {
                remoteObjectHandler = remoteObject;
                try {
                    new HuaweiAuthApiImpl().login(AGConnectInstance.getInstance(), new AuthLoginListener() {
                        @Override
                        public void loginSuccess(AGConnectAuthCredential agConnectAuthCredential) {
                            AGConnectAuth.getInstance()
                                    .getCurrentUser()
                                    .link(agConnectAuthCredential)
                                    .addOnFailureListener(new OnFailureListener() {
                                        @Override
                                        public void onFailure(Exception e) {
                                            AGCAuthException agcAuthException = (AGCAuthException) e;
                                            Map<String, Object> res = new HashMap<>();
                                            res.put("code", agcAuthException.getCode());
                                            res.put("msg", agcAuthException.getErrMsg());
                                            MessageParcel callbackData = MessageParcel.obtain();
                                            MessageParcel callbackReply = MessageParcel.obtain();
                                            MessageOption callbackOption = new MessageOption();
                                            callbackData.writeString(ZSONObject.toZSONString(res));
                                            if (remoteObjectHandler != null) {
                                                try {
                                                    remoteObjectHandler.sendRequest(0, callbackData, callbackReply,
                                                            callbackOption);
                                                } catch (RemoteException remoteException) {
                                                    HiLog.error(TAG, "RemoteException");
                                                }
                                            }
                                            callbackReply.reclaim();
                                            callbackData.reclaim();
                                        }
                                    })
                                    .addOnCompleteListener(new OnHarmonyCompleteListener<SignInResult>() {
                                        @Override
                                        public void onComplete(HarmonyTask<SignInResult> harmonyTask) {
                                            Map<String, Object> res = new HashMap<>();
                                            res.put("code", harmonyTask.isSuccessful() ? 0 : -1);
                                            res.put("msg",
                                                    harmonyTask.isSuccessful() ? "" : harmonyTask.getException().getMessage());
                                            MessageParcel callbackData = MessageParcel.obtain();
                                            MessageParcel callbackReply = MessageParcel.obtain();
                                            MessageOption callbackOption = new MessageOption();
                                            callbackData.writeString(ZSONObject.toZSONString(res));
                                            if (remoteObjectHandler != null) {
                                                try {
                                                    remoteObjectHandler.sendRequest(0, callbackData, callbackReply,
                                                            callbackOption);
                                                } catch (RemoteException e) {
                                                    HiLog.error(TAG, "RemoteException");
                                                }
                                            }
                                            callbackReply.reclaim();
                                            callbackData.reclaim();
                                        }
                                    });
                        }

                        @Override
                        public void loginCancel() {

                        }

                        @Override
                        public void loginFailure(Exception e) {
                            Map<String, Object> res = new HashMap<>();
                            res.put("code", -1);
                            res.put("msg", e.getMessage());
                            MessageParcel callbackData = MessageParcel.obtain();
                            MessageParcel callbackReply = MessageParcel.obtain();
                            MessageOption callbackOption = new MessageOption();
                            callbackData.writeString(ZSONObject.toZSONString(res));
                            if (remoteObjectHandler != null) {
                                try {
                                    remoteObjectHandler.sendRequest(0, callbackData, callbackReply, callbackOption);
                                } catch (RemoteException re) {
                                    HiLog.error(TAG, "RemoteException");
                                }
                            }
                            callbackReply.reclaim();
                            callbackData.reclaim();
                        }
                    });
                    return true;
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
}

