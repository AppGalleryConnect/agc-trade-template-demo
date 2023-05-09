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

package com.huawei.scenicarea.map;

import com.huawei.agconnect.lowcode.AGConnectLowCode;
import com.huawei.agconnect.lowcode.internal.beans.DataModelReqParams;
import com.huawei.agconnect.lowcode.internal.beans.request.DataModelRequest;
import com.huawei.agconnect.lowcode.internal.beans.response.DataModelResponse;
import com.huawei.hmf.tasks.HarmonyTask;
import com.huawei.hmf.tasks.OnHarmonyCompleteListener;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class PoiController {
    private static final HiLogLabel TAG = new HiLogLabel(HiLog.DEBUG, 0x0, PoiController.class.getName());
    private final List<PoiInfo> poiInfos = new ArrayList<>();
    private final List<String> tabList = new ArrayList<>();

    private final ITabView tabView;

    public PoiController(ITabView tabView) {
        this.tabView = tabView;
        initData();
    }

    private void initData() {
        DataModelRequest request = new DataModelRequest();
        request.setModelId(MapConfig.MODEL_ID_POI);
        request.setStatus(0);
        request.setMethodName("list");
        DataModelReqParams params = new DataModelReqParams();
        params.setOrderBy("orderNumber");
        params.setOrderType("asc");
        request.setParams(params);
        HarmonyTask<DataModelResponse> task = AGConnectLowCode.getInstance().callDataModel(request);
        task.addOnCompleteListener(new OnHarmonyCompleteListener<DataModelResponse>() {
            @Override
            public void onComplete(HarmonyTask<DataModelResponse> harmonyTask) {
                if (harmonyTask.isSuccessful()) {
                    DataModelResponse response = harmonyTask.getResult();
                    List<Map<String, Object>> list = response.getData().getRecords();
                    poiInfos.clear();
                    for (Map<String, Object> map : list) {
                        PoiInfo poiInfo = new PoiInfo();
                        poiInfo.setId(map.get("id").toString());
                        poiInfo.setName(map.get("name").toString());
                        String type = map.get("type").toString();
                        poiInfo.setType(type);
                        if (!tabList.contains(type)) {
                            tabList.add(type);
                        }
                        poiInfo.setPicType(map.get("picType").toString());
                        poiInfo.setLatitude(Double.parseDouble(map.get("latitude").toString()));
                        poiInfo.setLongitude(Double.parseDouble(map.get("longitude").toString()));
                        poiInfos.add(poiInfo);
                    }
                    tabView.initTabView(tabList);
                    HiLog.info(TAG, "success");
                } else {
                    HiLog.info(TAG, "fail");
                }
            }
        });
    }

    public List<PoiInfo> getPoiInfos(String poiType) {
        return poiInfos.stream().filter(poiInfo -> poiInfo.getType().equals(poiType)).collect(Collectors.toList());
    }

}
