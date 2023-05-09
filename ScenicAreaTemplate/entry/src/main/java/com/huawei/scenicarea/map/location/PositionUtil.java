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

import com.huawei.agconnect.https.HttpsKit;
import com.huawei.agconnect.https.HttpsResult;
import com.huawei.agconnect.https.Method;
import com.huawei.agconnect.https.annotation.Url;
import com.huawei.hmf.tasks.OnCompleteListener;
import com.huawei.hmf.tasks.Task;
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
import ohos.utils.zson.ZSONObject;

import java.util.ArrayList;
import java.util.HashMap;

public class PositionUtil extends LifecycleObserver implements LocatorCallback {
    private static final HiLogLabel TAG = new HiLogLabel(HiLog.DEBUG, 0x0, PositionUtil.class.getName());

    private static Locator locator;

    private static final PositionUtil INSTANCE = new PositionUtil();

    private Location location = new Location(0.0, 0.0);

    public AGCLocation agcLocation = new AGCLocation(0.0, 0.0);

    private HttpsKit httpsKit = new HttpsKit.Builder().build();

    private int reportNum = 2;

    private static final String TX_LOCATION_URL_KEY = "EEMBZ-AGRRQ-44I5I-4EYUD-CY6X5-V6B74";

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
        return agcLocation;
    }

    @Override
    public void onLocationReport(Location location) {
        HiLog.info(TAG, "onLocationReport：");
        reportNum++;
        //大概5s返回一次数据 10s转换一次 如果位置不变不转换 第一次强制转换
        if (reportNum >= 2 && !(location.getLatitude() == this.location.getLatitude() && location.getLongitude() == this.location.getLongitude())) {
            transformLocation(location.getLatitude(), location.getLongitude());
            reportNum = 0;
            this.location = location;
        }
    }

    @Override
    public void onStatusChanged(int i) {

    }

    @Override
    public void onErrorReport(int i) {

    }

    private void transformLocation(double lat, double lng) {
        AGCLocationRequest request = new AGCLocationRequest(lat, lng);
        Method method = new Method.Get(request);
        final Task<HttpsResult> task = httpsKit.create().execute(method);
        task.addOnCompleteListener(new OnCompleteListener<HttpsResult>() {
            @Override
            public void onComplete(Task<HttpsResult> task) {
                if (task.isSuccessful()) {
                    String string = task.getResult().getResponse().toString();
                    TXLocation txLocation = ZSONObject.stringToClass(string, TXLocation.class);
                    ArrayList locationList = txLocation.getLocations();
                    if (!locationList.isEmpty()) {
                        HashMap locationMap = (HashMap) locationList.get(0);
                        double lat = (double) locationMap.get("lat");
                        double lng = (double) locationMap.get("lng");
                        agcLocation.setLatitudeLongitude(lat, lng);
                    }
                }
            }
        });
    }

    public static class AGCLocation extends Location implements IWebBridge.JsResult {
        private double latitude;
        private double longitude;

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

        public void setLatitudeLongitude(double latitude, double longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }

    private class AGCLocationRequest {

        private double latitude;

        private double longitude;
        @Url
        private String url = "";

        public AGCLocationRequest(double latitude, double longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
            this.url = "https://apis.map.qq.com/ws/coord/v1/translate?locations=" + this.latitude + "," + this.longitude + "&type=1&key=" + TX_LOCATION_URL_KEY;
        }
    }
}
