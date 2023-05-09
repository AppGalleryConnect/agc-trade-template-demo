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

import com.huawei.agconnect.common.TextUtils;
import com.huawei.agconnect.lowcode.AGConnectLowCode;
import com.huawei.agconnect.lowcode.internal.beans.request.DataModelRequest;
import com.huawei.agconnect.lowcode.internal.beans.response.DataModelResponse;
import com.huawei.hmf.tasks.HarmonyTask;
import com.huawei.hmf.tasks.HarmonyTaskCompletionSource;
import com.huawei.hmf.tasks.HarmonyTasks;
import com.huawei.scenicarea.map.MapConfig;
import com.huawei.scenicarea.map.PoiInfo;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;
import ohos.utils.zson.ZSONArray;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class RouteDataModel {
    private static final HiLogLabel TAG = new HiLogLabel(HiLog.DEBUG, 0x0, RouteDataModel.class.getName());
    private volatile List<Route> routeList;

    public RouteDataModel() {
        request();
    }

    public HarmonyTask<List<Route>> request() {
        HarmonyTaskCompletionSource<List<Route>> source = new HarmonyTaskCompletionSource<>();
        DataModelRequest request = new DataModelRequest();
        request.setModelId(MapConfig.MODEL_ID_ROUTE);
        request.setStatus(0);
        request.setMethodName("list");
        HarmonyTask<DataModelResponse> task = AGConnectLowCode.getInstance().callDataModel(request);
        task.addOnCompleteListener(harmonyTask -> {
            if (harmonyTask.isSuccessful()) {
                HiLog.info(TAG, "success");
                DataModelResponse response = harmonyTask.getResult();
                List<Map<String, Object>> list = response.getData().getRecords();
                routeList = new ArrayList<>();
                for (Map<String, Object> map : list) {
                    Route route = new Route();
                    route.setId(map.get("id").toString());
                    route.setName(map.get("name").toString());
                    route.setDesc(map.get("desc").toString());
                    String poiInfos = map.get("poiInfos").toString();
                    route.setPoiInfos(poiInfos);
                    if (!TextUtils.isEmpty(poiInfos)) {
                        route.setPoiInfoList(ZSONArray.stringToClassList(poiInfos, PoiInfo.class));
                    }
                    routeList.add(route);
                }
                source.setResult(routeList);
            } else {
                HiLog.info(TAG, "fail");
                source.setException(harmonyTask.getException());
            }
        });
        return source.getTask();
    }

    public List<Route> getRoute() {
        if (routeList != null) {
            return routeList;
        }
        try {
            List<Route> list = HarmonyTasks.await(request(), 2L, TimeUnit.SECONDS);
            if (list != null) {
                return list;
            }
        } catch (Exception e) {
            HiLog.info(TAG, "getRoute exception:" + e.getMessage());
        }
        return Collections.emptyList();
    }

}
