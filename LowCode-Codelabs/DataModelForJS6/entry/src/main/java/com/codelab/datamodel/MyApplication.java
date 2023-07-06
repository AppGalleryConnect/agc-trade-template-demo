package com.codelab.datamodel;

import ohos.aafwk.ability.AbilityPackage;

public class MyApplication extends AbilityPackage {
    @Override
    public void onInitialize() {
        super.onInitialize();
        com.huawei.agconnect.AGConnectInstance.initialize(this);
    }
}
