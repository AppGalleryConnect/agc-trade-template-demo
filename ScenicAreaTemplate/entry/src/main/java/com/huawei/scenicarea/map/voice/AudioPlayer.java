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

import ohos.app.Context;
import ohos.media.common.Source;
import ohos.media.player.Player;

public class AudioPlayer {
    private String url = "";
    private Player player;
    private Context context;

    public AudioPlayer(String url, Context context) {
        this.url = url;
        this.context = context;
    }

    private void initPlayer() {
        if (player == null) {
            player = new Player(context);
            Source source = new Source(url);
            player.setSource(source);
            player.prepare();
            player.setPlayerCallback(new Player.IPlayerCallback() {
                @Override
                public void onPrepared() {

                }

                @Override
                public void onMessage(int i, int i1) {

                }

                @Override
                public void onError(int i, int i1) {

                }

                @Override
                public void onResolutionChanged(int i, int i1) {

                }

                @Override
                public void onPlayBackComplete() {

                }

                @Override
                public void onRewindToComplete() {

                }

                @Override
                public void onBufferingChange(int i) {

                }

                @Override
                public void onNewTimedMetaData(Player.MediaTimedMetaData mediaTimedMetaData) {

                }

                @Override
                public void onMediaTimeIncontinuity(Player.MediaTimeInfo mediaTimeInfo) {

                }
            });
        }
    }

    public void play() {
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                initPlayer();
                player.play();
            }
        });
        thread.start();
    }

    public void stop() {
        if (player != null) {
            this.player.stop();
            this.player.release();
            this.player = null;
        }
    }

}
