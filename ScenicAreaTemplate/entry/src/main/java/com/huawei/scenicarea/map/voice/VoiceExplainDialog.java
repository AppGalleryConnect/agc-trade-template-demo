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

import com.huawei.scenicarea.ResourceTable;
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

public class VoiceExplainDialog extends LifecycleObserver implements VoiceExplainProvider.PlayListener {
    private static final HiLogLabel TAG = new HiLogLabel(HiLog.DEBUG, 0x0, VoiceExplainDialog.class.getName());
    private final Context context;
    private CommonDialog commonDialog;
    private AudioPlayer audioPlayer;
    VoiceDataModel dataModel;

    public VoiceExplainDialog(Context context) {
        HiLog.info(TAG, "init");
        this.context = context;
        dataModel = new VoiceDataModel();
    }

    public void show() {
        if (commonDialog != null) {
            context.getUITaskDispatcher().asyncDispatch(() -> commonDialog.show());
            return;
        }
        List<VoiceExplain> voiceExplains = dataModel.getVoices();
        context.getUITaskDispatcher().asyncDispatch(() -> {
            Component container = LayoutScatter.getInstance(context).parse(ResourceTable.Layout_window_vocie_explain, null, false);
            commonDialog = new CommonDialog(context);
            ListContainer listContainer = (ListContainer) container.findComponentById(ResourceTable.Id_list_container_voice);
            VoiceExplainProvider provider = new VoiceExplainProvider(voiceExplains, context, this);
            listContainer.setItemProvider(provider);
            commonDialog.setContentCustomComponent(container);
            commonDialog.setAutoClosable(true);
            commonDialog.setSize(195 * 3, MATCH_CONTENT);
            commonDialog.show();
        });
    }

    @Override
    public void onVoicePlay(String voiceUrl) {
        onVoiceStop();
        audioPlayer = new AudioPlayer(voiceUrl, context);
        audioPlayer.play();
    }

    @Override
    public void onVoiceStop() {
        if (audioPlayer != null) {
            audioPlayer.stop();
        }
    }

    @Override
    public void onStop() {
        super.onStop();
        if (commonDialog != null) {
            commonDialog.destroy();
        }
        onVoiceStop();
    }
}
