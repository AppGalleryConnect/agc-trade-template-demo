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

import {Core, ExpectExtend,InstrumentLog} from 'deccjsunit/index'

export default {
    data: {
        title: ""
    },
    onInit() {
        this.title = this.$t('strings.world');
    },
    onShow() {
        console.info('onShow finish')
        const core = Core.getInstance()
        const expectExtend = new ExpectExtend({
            'id': 'extend'
        })
        const instrumentLog = new InstrumentLog({
            'id': 'report', 'unity': 'true'
        })
        core.addService('expect', expectExtend)
        core.addService('report', instrumentLog)
        core.init()
        core.subscribeEvent('spec', instrumentLog)
        core.subscribeEvent('suite', instrumentLog)
        core.subscribeEvent('task', instrumentLog)
        const configService = core.getDefaultService('config')
        configService.setConfig(this)
        require('../../../test/List.test')
        core.execute()
    },
    onReady() {
    },
}