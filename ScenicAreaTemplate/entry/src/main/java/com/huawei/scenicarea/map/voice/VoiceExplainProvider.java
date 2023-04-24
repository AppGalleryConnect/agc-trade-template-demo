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
import ohos.agp.components.BaseItemProvider;
import ohos.agp.components.Component;
import ohos.agp.components.ComponentContainer;
import ohos.agp.components.DirectionalLayout;
import ohos.agp.components.Image;
import ohos.agp.components.LayoutScatter;
import ohos.agp.components.Text;
import ohos.app.Context;
import ohos.utils.net.Uri;
import com.bumptech.glide.Glide;

import java.util.List;

public class VoiceExplainProvider extends BaseItemProvider {
    private final List<VoiceExplain> list;
    private final Context context;
    private final PlayListener playListener;

    public VoiceExplainProvider(List<VoiceExplain> list, Context context, PlayListener playListener) {
        this.list = list;
        this.context = context;
        this.playListener = playListener;
    }

    @Override
    public int getCount() {
        return list == null ? 0 : list.size();
    }

    @Override
    public Object getItem(int position) {
        if (list != null && position >= 0 && position < list.size()) {
            return list.get(position);
        }
        return null;
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public Component getComponent(int position, Component component, ComponentContainer componentContainer) {
        final Component cpt;
        Holder holder;
        if (component == null) {
            cpt = LayoutScatter.getInstance(context).parse(ResourceTable.Layout_listitem_voice_explain, null, false);
            holder = new Holder(cpt);
            cpt.setTag(holder);
        } else {
            cpt = component;
            // 从缓存中获取到列表项实例后，直接使用绑定的子组件信息进行数据填充。
            holder = (Holder) cpt.getTag();
        }
        VoiceExplain item = list.get(position);
        holder.nameText.setText(item.getName());
        holder.playNumberText.setText(String.format("播放量 %s万", item.getPlayNumber()));

        holder.layout.setClickedListener(new Component.ClickedListener() {
            @Override
            public void onClick(Component component) {
                if (holder.playText.getText().equals(PlayMode.PLAY.getMode())) {
                    playListener.onVoicePlay(item.getVoiceUrl());
                    holder.playText.setText(PlayMode.STOP.getMode());
                } else {
                    playListener.onVoiceStop();
                    holder.playText.setText(PlayMode.PLAY.getMode());
                }
            }
        });

        Uri uri = Uri.parse(item.getPictureUrl());
        Glide.with(context).load(uri).into(holder.image);
        return cpt;
    }

    public static class Holder {
        Image image;
        Text nameText;
        Text playNumberText;
        DirectionalLayout layout;
        Text playText;

        public Holder(Component component) {
            image = (Image) component.findComponentById(ResourceTable.Id_image_voice);
            nameText = (Text) component.findComponentById(ResourceTable.Id_text_name);
            playNumberText = (Text) component.findComponentById(ResourceTable.Id_text_play_number);
            layout = (DirectionalLayout) component.findComponentById(ResourceTable.Id_layout_play);
            playText = (Text) component.findComponentById(ResourceTable.Id_text_play);
        }
    }

    public interface PlayListener {
        void onVoicePlay(String voiceUrl);

        void onVoiceStop();
    }

    public enum PlayMode {
        PLAY("播放"), STOP("停止");
        private final String mode;

        PlayMode(String mode) {
            this.mode = mode;
        }

        public String getMode() {
            return this.mode;
        }
    }
}
