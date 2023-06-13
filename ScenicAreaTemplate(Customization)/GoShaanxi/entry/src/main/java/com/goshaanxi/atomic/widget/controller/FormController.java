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

package com.goshaanxi.atomic.widget.controller;

import ohos.aafwk.ability.AbilitySlice;
import ohos.aafwk.ability.ProviderFormInfo;
import ohos.aafwk.content.Intent;
import ohos.app.Context;

/**
 * The api set for form controller.
 */
public abstract class FormController {
    /**
     * Context of ability
     */
    protected final Context context;

    /**
     * The name of current form service widget
     */
    protected final String formName;

    /**
     * The dimension of current form service widget
     */
    protected final int dimension;

    public FormController(Context context, String formName, Integer dimension) {
        this.context = context;
        this.formName = formName;
        this.dimension = dimension;
    }

    /**
     * Bind data for a form
     *
     * @return ProviderFormInfo
     */
    public abstract ProviderFormInfo bindFormData(long formId);

    /**
     * Update form data
     *
     * @param formId the id of service widget to be updated
     * @param vars   the data to update for service widget, this parameter is optional
     */
    public abstract void updateFormData(long formId, Object... vars);

    /**
     * Update form data on time, this update time is set in config.json by scheduledUpdateTime property
     *
     * @param formId the id of service widget to be updated
     */
    public void onUpdateFormData(long formId) {
    }

    /**
     * Called when receive service widget message event
     *
     * @param formId  form id
     * @param message the message context sent by service widget message event
     */
    public abstract void onTriggerFormEvent(long formId, String message);

    /**
     * Get the destination ability slice to route
     *
     * @param intent intent of current page slice
     * @return the destination ability slice name to route
     */
    public abstract Class<? extends AbilitySlice> getRoutePageSlice(Intent intent);

    /**
     * Delete the resource related to current service widget
     *
     * @param formId form id
     */
    public void onDeleteForm(long formId) {
    }

    /**
     * Get the dimension of current service widget
     *
     * @return the dimension of current service widget
     */
    public int getDimension() {
        return dimension;
    }

    /**
     * Get the name of current service widget
     *
     * @return the name of current service widget
     */
    public String getFormName() {
        return formName;
    }
}
