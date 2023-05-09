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

import com.huawei.scenicarea.MainAbility;
import com.huawei.scenicarea.map.slice.MapAbilitySlice;

import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;
import ohos.bundle.IBundleManager;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

public class MapAbility extends Ability {
    private static final HiLogLabel TAG = new HiLogLabel(HiLog.DEBUG, 0x0, MainAbility.class.getName());

    public static final String PERM_LOCATION = "ohos.permission.LOCATION";

    public static final String PERM_MEDIA = "ohos.permission.READ_MEDIA";

    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        requestPermission();
        super.setMainRoute(MapAbilitySlice.class.getName());
    }

    private void requestPermission() {
        if (verifySelfPermission(PERM_LOCATION) != IBundleManager.PERMISSION_GRANTED) {
            requestPermissionsFromUser(new String[] {PERM_LOCATION, PERM_MEDIA}, 0);
        }
    }

    @Override
    public void onRequestPermissionsFromUserResult(int requestCode, java.lang.String[] permissions,
        int[] grantResults) {
        if (permissions == null || permissions.length == 0 || grantResults == null || grantResults.length == 0) {
            return;
        }

        if (grantResults[0] == IBundleManager.PERMISSION_GRANTED) {
            HiLog.info(TAG, "Permission granted");
        } else {

            HiLog.info(TAG, "Permission denied");
        }
    }

}
