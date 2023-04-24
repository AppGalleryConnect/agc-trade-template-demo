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

package com.huawei.scenicarea.map.slice;

import com.huawei.scenicarea.ResourceTable;
import com.huawei.scenicarea.map.IMapView;
import com.huawei.scenicarea.map.ITabView;
import com.huawei.scenicarea.map.PoiController;
import com.huawei.scenicarea.map.internal.MapViewImpl;
import com.huawei.scenicarea.map.location.PositionUtil;
import ohos.aafwk.ability.AbilitySlice;
import ohos.aafwk.content.Intent;
import ohos.agp.components.TabList;
import ohos.agp.components.Text;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

import java.util.List;

public class MapAbilitySlice extends AbilitySlice implements ITabView {
    private static final HiLogLabel TAG = new HiLogLabel(HiLog.DEBUG, 0x0, MapAbilitySlice.class.getName());

    private IMapView mapView;
    private TabList tabListView;
    private PoiController poiController;
    private Text backText;

    @Override
    public void onStart(Intent intent) {
        HiLog.info(TAG, "onStart：");
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_map);
        initBackText();
        mapView = new MapViewImpl(this);
        PositionUtil.init(this);
        getLifecycle().addObserver(PositionUtil.getInstance());
        poiController = new PoiController(this);
        tabListView = (TabList) findComponentById(ResourceTable.Id_tab_list);
    }

    private void initBackText() {
        backText = (Text) findComponentById(ResourceTable.Id_backText);
        backText.setClickedListener(component -> onBackPressed());
    }

    @Override
    public void initTabView(List<String> tabs) {
        for (String tabName : tabs) {
            TabList.Tab tab = tabListView.new Tab(getContext());
            tab.setText(tabName);
            tabListView.addTab(tab);
        }

        tabListView.addTabSelectedListener(new TabList.TabSelectedListener() {
            @Override
            public void onSelected(TabList.Tab tab) {
                HiLog.info(TAG, "onSelected：" + tab.getText());
                mapView.refreshPoi(poiController.getPoiInfos(tab.getText()));
            }

            @Override
            public void onUnselected(TabList.Tab tab) {
                HiLog.info(TAG, "onUnselected：" + tab.getText());
                // 当某个Tab从选中状态变为未选中状态时的回调
            }

            @Override
            public void onReselected(TabList.Tab tab) {
                HiLog.info(TAG, "onReselected：" + tab.getText());
                // 当某个Tab已处于选中状态，再次被点击时的状态回调
            }
        });

        if (tabs.size() > 0) {
            tabListView.selectTabAt(0);
        }
    }

    @Override
    public void onActive() {
        HiLog.info(TAG, "onActive：");
        super.onActive();
    }

    @Override
    public void onForeground(Intent intent) {
        HiLog.info(TAG, "onForeground：");
        super.onForeground(intent);
    }

    @Override
    protected void onStop() {
        HiLog.info(TAG, "onStop：");
        super.onStop();
    }


}
