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

import com.huawei.scenicarea.map.IWebBridge;
import ohos.aafwk.ability.LifecycleObserver;
import ohos.aafwk.content.Intent;
import ohos.app.Context;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;
import ohos.location.Location;
import ohos.location.Locator;
import ohos.location.LocatorCallback;
import ohos.location.RequestParam;

public class PositionUtil extends LifecycleObserver implements LocatorCallback {
    private static final HiLogLabel TAG = new HiLogLabel(HiLog.DEBUG, 0x0, PositionUtil.class.getName());
    private static Locator locator;

    private static final PositionUtil INSTANCE = new PositionUtil();
    private Location location = new Location(0.0, 0.0);

    public static PositionUtil getInstance() {
        return INSTANCE;
    }

    public static void init(Context context) {
        locator = new Locator(context);
    }

    private PositionUtil() {
    }

    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        HiLog.info(TAG, "onStart：");
        RequestParam requestParam = new RequestParam(RequestParam.PRIORITY_ACCURACY, 0, 0);
        locator.startLocating(requestParam, this);
    }

    @Override
    public void onStop() {
        HiLog.info(TAG, "onStop：");
        locator.stopLocating(this);
    }

    public AGCLocation getLatestLocation() {
        return new AGCLocation(location.getLatitude(), location.getLongitude());
    }

    @Override
    public void onLocationReport(Location location) {
        HiLog.info(TAG, "onLocationReport：");
        this.location = location;
    }

    @Override
    public void onStatusChanged(int i) {

    }

    @Override
    public void onErrorReport(int i) {

    }

    public static class AGCLocation extends Location implements IWebBridge.JsResult {
        private final double latitude;
        private final double longitude;

        public AGCLocation(double latitude, double longitude) throws IllegalArgumentException {
            super(latitude, longitude);
            this.latitude = latitude;
            this.longitude = longitude;
        }

        @Override
        public String convertResult() {
            return String.format("{\"latitude\":%f,\"longitude\":%f}", latitude, longitude);
        }

        public boolean isValid() {
            return !Double.isNaN(latitude) && !Double.isNaN(longitude);
        }
    }
}
