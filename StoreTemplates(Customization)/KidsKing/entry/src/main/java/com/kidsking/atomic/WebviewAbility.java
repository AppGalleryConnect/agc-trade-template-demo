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

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;
import ohos.agp.components.ComponentContainer;
import ohos.agp.components.DirectionalLayout;
import ohos.agp.components.webengine.*;
import ohos.media.image.PixelMap;

public class WebviewAbility extends Ability {

    private String url = "";
    private String uid = "";
    private String skey = "";
    private String domain = "";

    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        DirectionalLayout dLayout = new DirectionalLayout(this);
        dLayout.setLayoutConfig(new ComponentContainer.LayoutConfig(
                ComponentContainer.LayoutConfig.MATCH_PARENT,
                ComponentContainer.LayoutConfig.MATCH_PARENT
        ));
        super.setUIContent(dLayout);
        WebView webView = new WebView(getContext());
        webView.setWidth(ComponentContainer.LayoutConfig.MATCH_PARENT);
        webView.setHeight(ComponentContainer.LayoutConfig.MATCH_PARENT);
        webView.getWebConfig().setJavaScriptPermit(true);
        webView.getWebConfig().setWebStoragePermit(true);
        dLayout.addComponent(webView);

        String json = intent.getStringParam("__startParams");
        JSONObject object = JSON.parseObject(json, JSONObject.class);
        this.url = object.getString("url");
        this.uid = object.getString("uid");
        this.skey = object.getString("skey");
        this.domain = object.getString("domain");
        setWebAgent(webView);
        webView.load(this.url);
    }

    private void setWebAgent(WebView webView) {
        String uid = this.uid;
        String skey = this.skey;
        String domain = this.domain;
        webView.setWebAgent(new WebAgent() {
            @Override
            public void onLoadingPage(WebView webview, String url, PixelMap favicon) {
                super.onLoadingPage(webview, url, favicon);
                CookieStore cookieStore = CookieStore.getInstance();
                if (uid.length() > 0 && skey.length() > 0) {
                    cookieStore.setCookieEnable(true);
                    cookieStore.setCookie(domain, "uid=" + uid);
                    cookieStore.setCookie(domain, "skey=" + skey);
                }
            }

            @Override
            public void onPageLoaded(WebView webview, String url) {
                super.onPageLoaded(webview, url);
            }

            @Override
            public void onLoadingContent(WebView webview, String url) {
                super.onLoadingContent(webview, url);
            }

            @Override
            public void onError(WebView webview, ResourceRequest request, ResourceError error) {
                super.onError(webview, request, error);
            }
        });
    }
}
