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

package com.huawei.scenicarea.map.location;

import com.huawei.scenicarea.ResourceTable;
import com.huawei.scenicarea.map.IWebBridge;
import com.huawei.scenicarea.map.PoiInfo;
import com.huawei.scenicarea.util.JSONEncodeUtil;
import ohos.aafwk.ability.LifecycleObserver;
import ohos.agp.components.Component;
import ohos.agp.components.LayoutScatter;
import ohos.agp.components.ListContainer;
import ohos.agp.window.dialog.CommonDialog;
import ohos.app.Context;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

import java.util.List;

import static ohos.agp.components.ComponentContainer.LayoutConfig.MATCH_CONTENT;

public class RouteDialog extends LifecycleObserver implements RouteProvider.RouteListener {
    private static final HiLogLabel TAG = new HiLogLabel(HiLog.DEBUG, 0x0, RouteDialog.class.getName());
    private final Context context;
    private final IWebBridge webBridge;

    private CommonDialog commonDialog;
    private final RouteDataModel dataModel;

    public RouteDialog(Context context, IWebBridge webBridge) {
        HiLog.info(TAG, "init");
        this.context = context;
        this.webBridge = webBridge;
        dataModel = new RouteDataModel();
    }

    public void show() {
        if (commonDialog != null) {
            context.getUITaskDispatcher().asyncDispatch(() -> commonDialog.show());
            return;
        }
        List<Route> routes = dataModel.getRoute();
        context.getUITaskDispatcher().asyncDispatch(() -> {
            Component container = LayoutScatter.getInstance(context).parse(ResourceTable.Layout_window_route_location, null, false);
            commonDialog = new CommonDialog(context);
            ListContainer listContainer = (ListContainer) container.findComponentById(ResourceTable.Id_list_container_route);
            RouteProvider provider = new RouteProvider(routes, context, RouteDialog.this);
            listContainer.setItemProvider(provider);
            commonDialog.setContentCustomComponent(container);
            commonDialog.setAutoClosable(true);
            commonDialog.setSize(195 * 3, MATCH_CONTENT);
            commonDialog.show();
        });
    }

    @Override
    public void onStop() {
        super.onStop();
        destroyDialog();
    }

    @Override
    public void drawRoute(List<PoiInfo> list) {
        destroyDialog();
        try {
            String json = JSONEncodeUtil.toJson(list);
            webBridge.JavaToWeb("drawRoute", json);
        } catch (Exception e) {
            HiLog.info(TAG, "drawRoute parse json error:" + e.getMessage());
        }
    }

    private void destroyDialog() {
        if (commonDialog != null) {
            commonDialog.destroy();
        }
    }
}
