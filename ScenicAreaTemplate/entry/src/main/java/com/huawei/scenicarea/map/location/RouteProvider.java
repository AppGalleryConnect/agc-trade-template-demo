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
import com.huawei.scenicarea.map.PoiInfo;
import ohos.agp.components.BaseItemProvider;
import ohos.agp.components.Component;
import ohos.agp.components.ComponentContainer;
import ohos.agp.components.Image;
import ohos.agp.components.LayoutScatter;
import ohos.agp.components.Text;
import ohos.app.Context;

import java.util.List;

public class RouteProvider extends BaseItemProvider {
    private final List<Route> list;
    private final Context context;
    private final RouteListener listener;

    public RouteProvider(List<Route> list, Context context, RouteListener listener) {
        this.list = list;
        this.context = context;
        this.listener = listener;
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
        ViewHolder holder;
        if (component == null) {
            cpt = LayoutScatter.getInstance(context).parse(ResourceTable.Layout_listitem_route_location, null, false);
            holder = new ViewHolder(cpt);
            cpt.setTag(holder);
        } else {
            cpt = component;
            holder = (ViewHolder) cpt.getTag();
        }
        Route item = list.get(position);
        holder.nameText.setText(item.getName());
        holder.descText.setText(item.getDesc());
        holder.image.setClickedListener(component1 -> listener.drawRoute(item.getPoiInfoList()));
        return cpt;
    }

    public static class ViewHolder {
        Image image;
        Text nameText;
        Text descText;

        public ViewHolder(Component component) {
            image = (Image) component.findComponentById(ResourceTable.Id_image_route);
            nameText = (Text) component.findComponentById(ResourceTable.Id_text_route_name);
            descText = (Text) component.findComponentById(ResourceTable.Id_text_route_desc);
        }
    }

    public interface RouteListener {
        void drawRoute(List<PoiInfo> list);
    }
}
