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

package com.huawei.scenicarea.map.internal;

import com.huawei.hmf.tasks.Task;
import com.huawei.hmf.tasks.TaskCompletionSource;
import com.huawei.scenicarea.map.IWebBridge;
import ohos.agp.components.webengine.AsyncCallback;
import ohos.agp.components.webengine.JsCallback;
import ohos.agp.components.webengine.WebView;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

public class WebBridgeImpl implements IWebBridge {
    private static final HiLogLabel TAG = new HiLogLabel(HiLog.DEBUG, 0x0, WebBridgeImpl.class.getName());
    private final WebView webView;

    public WebBridgeImpl(WebView webView) {
        this.webView = webView;
    }

    @Override
    public Task<String> JavaToWeb(String functionName, String jsonParam) {
        TaskCompletionSource<String> source = new TaskCompletionSource<>();
        String format = String.format("javascript:%s(%s)", functionName, jsonParam);
        webView.executeJs(format, new AsyncCallback<String>() {
            @Override
            public void onReceive(String msg) {
                source.setResult(msg);
            }
        });
        return source.getTask();
    }

    @Override
    public void addJsCallback(String jsFunctionName, ProcessListener listener) {
        String newFunctionName = "JsCallbackToApp_" + jsFunctionName;
        webView.addJsCallback(newFunctionName, new JsCallback() {
            @Override
            public String onCallback(String jsParam) {
                HiLog.info(TAG, String.format("functionName:%s, jsParamL%s", newFunctionName, jsParam));
                return listener.process(jsParam).convertResult();
            }
        });
    }

}
