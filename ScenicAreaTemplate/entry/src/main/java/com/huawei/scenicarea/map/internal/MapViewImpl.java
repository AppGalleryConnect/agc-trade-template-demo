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

import com.huawei.scenicarea.ResourceTable;
import com.huawei.scenicarea.map.IMapView;
import com.huawei.scenicarea.map.IWebBridge;
import com.huawei.scenicarea.map.PoiInfo;
import com.huawei.scenicarea.map.location.PositionUtil;
import com.huawei.scenicarea.map.location.RouteDialog;
import com.huawei.scenicarea.map.voice.VoiceExplainDialog;
import com.huawei.scenicarea.util.JSONEncodeUtil;
import ohos.aafwk.ability.AbilitySlice;
import ohos.agp.components.webengine.ResourceRequest;
import ohos.agp.components.webengine.ResourceResponse;
import ohos.agp.components.webengine.WebAgent;
import ohos.agp.components.webengine.WebView;
import ohos.agp.utils.TextTool;
import ohos.app.Context;
import ohos.global.resource.Resource;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;
import ohos.utils.net.Uri;

import java.io.IOException;
import java.net.URLConnection;
import java.util.List;

public class MapViewImpl implements IMapView {
    private static final HiLogLabel TAG = new HiLogLabel(HiLog.DEBUG, 0x0, MapViewImpl.class.getName());
    private final WebView webView;
    private final Context context;
    private final IWebBridge webBridge;

    private final VoiceExplainDialog voiceExplainDialog;
    private final RouteDialog routeDialog;

    @Override
    public void refreshPoi(List<PoiInfo> list) {
        try {
            String json = JSONEncodeUtil.toJson(list);
            webBridge.JavaToWeb("refreshPoi", json);
        } catch (Exception e) {
            HiLog.info(TAG, "refreshPoi parse json error:" + e.getMessage());
        }
    }

    @Override
    public void showRouteLocation() {
        routeDialog.show();
    }

    @Override
    public void showVoiceExplain() {
        voiceExplainDialog.show();
    }

    public MapViewImpl(AbilitySlice abilitySlice) {
        context = abilitySlice.getContext();
        webView = (WebView) abilitySlice.findComponentById(ResourceTable.Id_webview);
        webBridge = new WebBridgeImpl(webView);

        voiceExplainDialog = new VoiceExplainDialog(context);
        abilitySlice.getLifecycle().addObserver(voiceExplainDialog);
        routeDialog = new RouteDialog(context, webBridge);
        abilitySlice.getLifecycle().addObserver(routeDialog);
        initMap();
    }

    private void initMap() {
        webView.getWebConfig().setJavaScriptPermit(true);
        webView.getWebConfig().setWebStoragePermit(true);
        webView.setWebAgent(new WebAgent() {
            @Override
            public ResourceResponse processResourceRequest(WebView webview, ResourceRequest request) {
                final String authority = "com.huawei.scenicarea";
                final String rawFile = "/rawfile/";
                Uri requestUri = request.getRequestUrl();
                if (authority.equals(requestUri.getDecodedAuthority())) {
                    String path = requestUri.getDecodedPath();
                    if (TextTool.isNullOrEmpty(path)) {
                        return super.processResourceRequest(webview, request);
                    }
                    HiLog.info(TAG, "path：" + path);
                    if (path.startsWith(rawFile)) {
                        // 根据自定义规则访问资源文件
                        String rawFilePath = "entry/resources/rawfile/" + path.replace(rawFile, "");
                        HiLog.info(TAG, "rawFilePath：" + rawFilePath);
                        String mimeType = URLConnection.guessContentTypeFromName(rawFilePath);
                        try {
                            Resource resource = context.getResourceManager().getRawFileEntry(rawFilePath).openRawFile();
                            return new ResourceResponse(mimeType, resource, null);
                        } catch (IOException e) {
                            HiLog.info(TAG, "open raw file failed：" + e.getMessage());
                        }
                    }
                }
                return super.processResourceRequest(webview, request);
            }
        });

        webBridge.addJsCallback("locate", jsParam -> PositionUtil.getInstance().getLatestLocation());
        webBridge.addJsCallback("routeLocation", jsParam -> {
            showRouteLocation();
            return new IWebBridge.JsSuccessResult();
        });
        webBridge.addJsCallback("voiceExplain", jsParam -> {
            showVoiceExplain();
            return new IWebBridge.JsSuccessResult();
        });
        webView.load("https://com.huawei.scenicarea/rawfile/tencent_map.html");
    }


}
