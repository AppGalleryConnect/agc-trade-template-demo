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

package com.huawei.scenicarea.map.voice;

import com.huawei.agconnect.lowcode.AGConnectLowCode;
import com.huawei.agconnect.lowcode.internal.beans.request.DataModelRequest;
import com.huawei.agconnect.lowcode.internal.beans.response.DataModelResponse;
import com.huawei.hmf.tasks.HarmonyTask;
import com.huawei.hmf.tasks.HarmonyTaskCompletionSource;
import com.huawei.hmf.tasks.HarmonyTasks;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class VoiceDataModel {
    private static final HiLogLabel TAG = new HiLogLabel(HiLog.DEBUG, 0x0, VoiceDataModel.class.getName());
    private volatile List<VoiceExplain> voiceExplains;

    public VoiceDataModel() {
        request();
    }

    public HarmonyTask<List<VoiceExplain>> request() {
        HarmonyTaskCompletionSource<List<VoiceExplain>> source = new HarmonyTaskCompletionSource<>();
        DataModelRequest request = new DataModelRequest();
        request.setModelId("1138416803509225601");
        request.setStatus(0);
        request.setMethodName("list");
        HarmonyTask<DataModelResponse> task = AGConnectLowCode.getInstance().callDataModel(request);
        task.addOnCompleteListener(harmonyTask -> {
            if (harmonyTask.isSuccessful()) {
                HiLog.info(TAG, "success");
                DataModelResponse response = harmonyTask.getResult();
                List<Map<String, Object>> list = response.getData().getRecords();
                voiceExplains = new ArrayList<>();
                for (Map<String, Object> map : list) {
                    VoiceExplain voiceExplain = new VoiceExplain();
                    voiceExplain.setId(map.get("id").toString());
                    voiceExplain.setName(map.get("name").toString());
                    voiceExplain.setPlayNumber(map.get("playNumber").toString());
                    voiceExplain.setPictureUrl(map.get("pictureUrl").toString());
                    voiceExplain.setVoiceUrl(map.get("voiceUrl").toString());
                    voiceExplains.add(voiceExplain);
                }
                source.setResult(voiceExplains);
            } else {
                HiLog.info(TAG, "fail");
                source.setException(harmonyTask.getException());
            }
        });
        return source.getTask();
    }

    public List<VoiceExplain> getVoices() {
        if (voiceExplains != null) {
            return voiceExplains;
        }
        try {
            List<VoiceExplain> list = HarmonyTasks.await(request(), 2L, TimeUnit.SECONDS);
            if (list != null) {
                return list;
            }
        } catch (Exception e) {
            HiLog.info(TAG, "getVoices exception:" + e.getMessage());
        }
        return Collections.emptyList();
    }

}
